"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder: customPlaceholder,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  // Focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      setIsSending(true);
      onSend(trimmedMessage);
      setMessage("");
      // Reset animation after a brief moment
      setTimeout(() => setIsSending(false), 300);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const characterCount = message.length;
  const isOverLimit = characterCount > maxLength;

  return (
    <div className="border-t border-border/40 bg-background/80 backdrop-blur-md p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex gap-3 items-end">
          {/* Text Input */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={customPlaceholder || "Type your message..."}
              disabled={disabled}
              className={cn(
                "min-h-[60px] max-h-[200px] resize-none pr-16",
                "focus-visible:ring-purple-600"
              )}
              rows={1}
            />

            {/* Character Counter */}
            <div
              className={cn(
                "absolute bottom-2 right-2 text-xs",
                isOverLimit ? "text-red-600" : "text-muted-foreground"
              )}
            >
              {characterCount}/{maxLength}
            </div>
          </div>

          {/* Send Button */}
          <motion.div
            animate={
              isSending
                ? {
                    scale: [1, 0.9, 1],
                    rotate: [0, -10, 0],
                  }
                : {}
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Button
              onClick={handleSend}
              disabled={disabled || !message.trim() || isOverLimit}
              size="icon"
              className="h-[60px] w-[60px] shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-105"
            >
              <motion.div
                animate={isSending ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Hint */}
        <p className="text-xs text-muted-foreground mt-2">
          Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}
