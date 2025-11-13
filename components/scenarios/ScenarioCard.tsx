"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Scenario } from "@/lib/scenarios";
import { cn } from "@/lib/utils";

interface ScenarioCardProps {
  scenario: Scenario;
  isSelected: boolean;
  onClick: () => void;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

export function ScenarioCard({
  scenario,
  isSelected,
  onClick,
  difficulty,
}: ScenarioCardProps) {
  const isRecommended = difficulty
    ? scenario.recommendedDifficulty.includes(difficulty)
    : false;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all h-full",
          "hover:shadow-lg hover:border-purple-500/50",
          isSelected && "ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-950/30",
          !isSelected && "hover:bg-accent/50"
        )}
        onClick={onClick}
      >
        <CardContent className="p-6">
          {/* Icon */}
          <div className="text-5xl mb-4">{scenario.icon}</div>

          {/* Title */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {scenario.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {scenario.description}
          </p>

          {/* Recommended Badge */}
          {isRecommended && (
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              Recommended for your level
            </Badge>
          )}

          {/* Difficulty Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {scenario.recommendedDifficulty.map((level) => (
              <Badge
                key={level}
                variant="outline"
                className={cn(
                  "text-xs",
                  level === difficulty && "border-purple-500 text-purple-700 dark:text-purple-400"
                )}
              >
                {level}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
