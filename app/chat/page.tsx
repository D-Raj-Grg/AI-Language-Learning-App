"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { useStore } from "@/lib/store";
import { nanoid } from "nanoid";

export default function ChatPage() {
  const router = useRouter();
  const {
    selectedLanguage,
    selectedDifficulty,
    selectedScenario,
    messages,
    isTyping,
    addMessage,
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

    // TODO: Call API to get AI response
    // For now, just simulate typing
    setIsTyping(true);

    // Simulate AI response (will be replaced with actual API call)
    setTimeout(() => {
      const aiMessage = {
        id: nanoid(),
        role: "assistant" as const,
        content:
          "I will respond to your message here. This is a placeholder until we integrate OpenAI.",
        timestamp: new Date(),
      };
      addMessage(aiMessage);
      setIsTyping(false);
    }, 2000);
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

      {/* Messages */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* Input */}
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </div>
  );
}
