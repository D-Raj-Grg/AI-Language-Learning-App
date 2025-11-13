"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CorrectionCard } from "./CorrectionCard";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface CorrectionPanelProps {
  className?: string;
}

export function CorrectionPanel({ className }: CorrectionPanelProps) {
  const { isCorrectionsVisible, toggleCorrectionsVisibility, corrections } =
    useStore();

  // Handle Escape key to close panel
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCorrectionsVisible) {
        toggleCorrectionsVisibility();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isCorrectionsVisible, toggleCorrectionsVisibility]);

  return (
    <AnimatePresence>
      {isCorrectionsVisible && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCorrectionsVisibility}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            role="complementary"
            aria-label="Corrections panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed right-0 top-0 bottom-0 z-40",
              "w-full sm:w-96",
              "bg-background border-l border-border",
              "flex flex-col",
              "shadow-2xl",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-600" />
                <h2 className="font-semibold text-lg">Corrections</h2>
                {corrections.length > 0 && (
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded-full">
                    {corrections.length}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCorrectionsVisibility}
                className="h-8 w-8"
                aria-label="Close corrections panel"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Corrections List */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {corrections.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <AlertCircle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">No corrections yet</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Keep practicing! Corrections will appear here as the AI identifies areas for improvement.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Review your corrections to improve your language skills
                    </p>
                    {corrections.map((correction) => (
                      <CorrectionCard
                        key={correction.id}
                        correction={correction}
                      />
                    ))}
                  </>
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            {corrections.length > 0 && (
              <div className="p-4 border-t border-border bg-muted/30">
                <p className="text-xs text-muted-foreground text-center">
                  Corrections are shown for the current conversation
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
