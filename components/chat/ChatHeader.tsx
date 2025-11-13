"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Settings, MessageSquare, RotateCcw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/store";

export function ChatHeader() {
  const router = useRouter();
  const {
    selectedScenario,
    selectedDifficulty,
    isCorrectionsVisible,
    toggleCorrectionsVisibility,
    clearConversation,
  } = useStore();

  const [showNewConversationDialog, setShowNewConversationDialog] =
    useState(false);

  const handleBack = () => {
    router.push("/scenarios");
  };

  const handleNewConversation = () => {
    clearConversation();
    setShowNewConversationDialog(false);
    toast.success("Conversation cleared", {
      description: "Starting fresh! Your vocabulary has been saved.",
    });
    router.push("/scenarios");
  };

  if (!selectedScenario) return null;

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Back + Scenario Info */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl">{selectedScenario.icon}</span>
              <h1 className="font-semibold text-sm md:text-base line-clamp-1">
                {selectedScenario.title}
              </h1>
              {selectedDifficulty && (
                <Badge variant="secondary" className="text-xs capitalize hidden sm:inline-flex">
                  {selectedDifficulty}
                </Badge>
              )}
            </div>
          </div>

          {/* Right: Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={toggleCorrectionsVisibility}>
                <MessageSquare className="w-4 h-4 mr-2" />
                {isCorrectionsVisible ? "Hide" : "Show"} Corrections
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/vocabulary")}>
                <BookOpen className="w-4 h-4 mr-2" />
                View Vocabulary
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowNewConversationDialog(true)}
                className="text-orange-600 dark:text-orange-400"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Conversation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* New Conversation Dialog */}
      <Dialog
        open={showNewConversationDialog}
        onOpenChange={setShowNewConversationDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start New Conversation?</DialogTitle>
            <DialogDescription>
              This will clear your current conversation history. Your vocabulary
              will be saved.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewConversationDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleNewConversation}>
              Start New
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
