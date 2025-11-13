"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { CorrectionPanel } from "@/components/corrections/CorrectionPanel";
import { useStore } from "@/lib/store";
import { nanoid } from "nanoid";

export default function ChatPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    selectedLanguage,
    selectedDifficulty,
    selectedScenario,
    messages,
    isTyping,
    addMessage,
    addCorrection,
    addVocabulary,
    setIsTyping,
  } = useStore();

  // Redirect if selections are missing
  useEffect(() => {
    if (!selectedLanguage || !selectedDifficulty || !selectedScenario) {
      router.push("/");
    }
  }, [selectedLanguage, selectedDifficulty, selectedScenario, router]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage = {
      id: nanoid(),
      role: "user" as const,
      content,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setIsTyping(true);
    setError(null);

    try {
      // Prepare messages for API
      const apiMessages = messages
        .concat([userMessage])
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      // Call streaming API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
          language: selectedLanguage,
          difficulty: selectedDifficulty,
          scenario: selectedScenario,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `API error: ${response.status}`
        );
      }

      // Read streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      if (!reader) {
        throw new Error("No response body");
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;
      }

      setIsTyping(false);

      // Parse the complete response
      try {
        const parsed = JSON.parse(accumulatedResponse);
        const aiMessageId = nanoid();
        const aiMessage = {
          id: aiMessageId,
          role: "assistant" as const,
          content: parsed.message || accumulatedResponse,
          corrections: parsed.corrections || [],
          timestamp: new Date(),
        };
        addMessage(aiMessage);

        // Add corrections to store
        if (parsed.corrections && parsed.corrections.length > 0) {
          parsed.corrections.forEach((correction: {
            original: string;
            corrected: string;
            explanation: string;
            category: "grammar" | "vocabulary" | "spelling" | "style";
          }) => {
            addCorrection({
              id: nanoid(),
              original: correction.original,
              corrected: correction.corrected,
              explanation: correction.explanation,
              category: correction.category,
              messageId: userMessage.id, // Link to the user's message that had the error
            });
          });
        }

        // Add vocabulary items to store
        if (parsed.vocabulary && parsed.vocabulary.length > 0) {
          parsed.vocabulary.forEach((item: {
            word: string;
            translation: string;
            context: string;
          }) => {
            addVocabulary({
              id: nanoid(),
              word: item.word,
              translation: item.translation,
              context: item.context,
              language: selectedLanguage || "unknown",
              learnedAt: new Date(),
              reviewCount: 0,
            });
          });
        }
      } catch {
        // If parsing fails, use raw content
        const aiMessage = {
          id: nanoid(),
          role: "assistant" as const,
          content: accumulatedResponse,
          timestamp: new Date(),
        };
        addMessage(aiMessage);
      }
    } catch (err) {
      setIsTyping(false);
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Chat error:", err);
    }
  };

  if (!selectedLanguage || !selectedDifficulty || !selectedScenario) {
    return null; // Will redirect
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      {/* Header */}
      <ChatHeader />

      {/* Error Display */}
      {error && (
        <div className="container mx-auto max-w-4xl px-4 pt-4">
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200 text-sm">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* Input */}
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />

      {/* Corrections Panel */}
      <CorrectionPanel />
    </div>
  );
}
