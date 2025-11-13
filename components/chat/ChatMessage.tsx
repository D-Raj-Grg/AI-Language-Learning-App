"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, User, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/store";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "flex gap-3 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          isUser
            ? "bg-gradient-to-br from-purple-600 to-blue-600"
            : "bg-muted"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-muted-foreground" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start", "max-w-[80%] md:max-w-[70%]")}>
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl shadow-sm",
            isUser
              ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
              : "bg-muted text-foreground"
          )}
        >
          <p className="text-sm md:text-base whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        {/* Timestamp and Actions */}
        <div className="flex items-center gap-2 px-2">
          <span className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>

          {/* Copy Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>

          {/* Correction Indicator */}
          {message.corrections && message.corrections.length > 0 && (
            <span className="text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 px-2 py-0.5 rounded-full">
              {message.corrections.length} correction{message.corrections.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
