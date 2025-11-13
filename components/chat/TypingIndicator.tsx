"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2 bg-muted rounded-2xl w-fit">
      <motion.div
        className="w-2 h-2 bg-muted-foreground/60 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0,
        }}
      />
      <motion.div
        className="w-2 h-2 bg-muted-foreground/60 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-2 h-2 bg-muted-foreground/60 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.4,
        }}
      />
    </div>
  );
}
