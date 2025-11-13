"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { VocabularyItem } from "@/lib/store";

interface VocabularyCardProps {
  item: VocabularyItem;
  onRemove: (id: string) => void;
}

export function VocabularyCard({ item, onRemove }: VocabularyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="perspective-1000">
      <motion.div
        className="relative h-48 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front - Word */}
          <Card
            className={cn(
              "absolute inset-0 backface-hidden",
              "bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30",
              "border-2 border-purple-200 dark:border-purple-800",
              "flex flex-col items-center justify-center p-6"
            )}
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-sm text-muted-foreground mb-2">Word</p>
            <h3 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {item.word}
            </h3>
            <p className="text-xs text-muted-foreground">Click to flip</p>
          </Card>

          {/* Back - Translation */}
          <Card
            className={cn(
              "absolute inset-0 backface-hidden",
              "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
              "border-2 border-emerald-200 dark:border-emerald-800",
              "flex flex-col items-center justify-center p-6"
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-sm text-muted-foreground mb-2">Translation</p>
            <h3 className="text-2xl font-bold text-center mb-4 text-emerald-700 dark:text-emerald-400">
              {item.translation}
            </h3>
            <p className="text-xs text-muted-foreground text-center">
              Click to flip back
            </p>
          </Card>
        </motion.div>
      </motion.div>

      {/* Context and Actions */}
      <div className="mt-3 space-y-2">
        <div className="text-xs text-muted-foreground italic line-clamp-2">
          &quot;{item.context}&quot;
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(item.learnedAt)}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="h-7 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
