import { OPENAI_CONFIG } from "@/lib/openai";
import { buildSystemPrompt } from "@/lib/prompts";
import { streamText } from "ai";
import { openai as openaiProvider } from "@ai-sdk/openai";
import type { Scenario } from "@/lib/scenarios";

// Input sanitization helper
function sanitizeMessage(message: string): string {
  // Remove HTML tags
  const withoutHtml = message.replace(/<[^>]*>/g, "");
  // Remove excessive whitespace
  const normalized = withoutHtml.replace(/\s+/g, " ").trim();
  // Limit length to 500 characters
  return normalized.slice(0, 500);
}

// Rate limiting storage (in-memory for MVP, should use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
};

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Clean up old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export async function POST(req: Request) {
  try {
    // Check API key at runtime
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-placeholder-for-build") {
      return new Response(
        JSON.stringify({
          error: "OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get IP or session ID for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please wait a moment before sending another message.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await req.json();
    const { messages, language, difficulty, scenario } = body as {
      messages: Array<{ role: string; content: string }>;
      language: string;
      difficulty: "beginner" | "intermediate" | "advanced";
      scenario: Scenario;
    };

    // Validate required fields
    if (!messages || !language || !difficulty || !scenario) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: messages, language, difficulty, or scenario",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_URL || "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // Validate messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid messages array" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_URL || "*",
          },
        }
      );
    }

    // Sanitize and validate messages
    const sanitizedMessages = messages.map((msg) => {
      if (!msg.content || typeof msg.content !== "string") {
        throw new Error("Invalid message content");
      }
      return {
        role: msg.role as "user" | "assistant",
        content: sanitizeMessage(msg.content),
      };
    });

    // Build system prompt
    const systemPrompt = buildSystemPrompt({ language, difficulty, scenario });

    // Call OpenAI with streaming using AI SDK v5
    const result = streamText({
      model: openaiProvider(OPENAI_CONFIG.model),
      temperature: OPENAI_CONFIG.temperature,
      system: systemPrompt,
      messages: sanitizedMessages,
    });

    // Return streaming response
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return new Response(
          JSON.stringify({
            error: "OpenAI API configuration error. Please check your API key.",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your message. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_URL || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export const runtime = "edge";
