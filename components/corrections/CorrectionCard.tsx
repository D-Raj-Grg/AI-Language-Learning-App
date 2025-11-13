"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Correction } from "@/lib/store";

interface CorrectionCardProps {
  correction: Correction;
}

const categoryColors = {
  grammar: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  vocabulary: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  spelling: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800",
  style: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
};

const categoryLabels = {
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  spelling: "Spelling",
  style: "Style",
};

export function CorrectionCard({ correction }: CorrectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-3 hover:border-border/80 transition-colors"
    >
      {/* Category Badge */}
      <Badge
        variant="outline"
        className={cn(
          "mb-2 text-xs",
          categoryColors[correction.category]
        )}
      >
        {categoryLabels[correction.category]}
      </Badge>

      {/* Original and Corrected Text */}
      <div className="space-y-2 mb-2">
        {/* Original */}
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground text-xs mt-1 shrink-0">Original:</span>
          <p className="text-sm line-through text-red-600 dark:text-red-400">
            {correction.original}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Corrected */}
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground text-xs mt-1 shrink-0">Correct:</span>
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            {correction.corrected}
          </p>
        </div>
      </div>

      {/* Expandable Explanation */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between text-xs h-7 px-2"
        >
          <span>{isExpanded ? "Hide" : "Show"} explanation</span>
          <ChevronDown
            className={cn(
              "w-3 h-3 transition-transform",
              isExpanded && "rotate-180"
            )}
          />
        </Button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-2 px-2 pb-1">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {correction.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
