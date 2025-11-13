import OpenAI from "openai";

// Use placeholder during build, will be checked at runtime
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-placeholder-for-build",
});

// Configuration constants
export const OPENAI_CONFIG = {
  model: "gpt-4-turbo-preview",
  temperature: 0.7,
  maxTokens: 500,
  stream: true,
} as const;
