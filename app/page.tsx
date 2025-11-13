"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Sparkles,
  BookOpen,
  Zap,
  Globe,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { useStore } from "@/lib/store";

const languages = [
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
];

const difficulties: Array<{
  level: "beginner" | "intermediate" | "advanced";
  label: string;
  description: string;
  icon: string;
}> = [
  {
    level: "beginner",
    label: "Beginner",
    description: "Simple sentences, common vocabulary",
    icon: "📚",
  },
  {
    level: "intermediate",
    label: "Intermediate",
    description: "Complex sentences, varied tenses",
    icon: "📖",
  },
  {
    level: "advanced",
    label: "Advanced",
    description: "Native-like complexity, idioms",
    icon: "🎓",
  },
];

const features = [
  {
    icon: MessageCircle,
    title: "Real Conversations",
    description: "Practice natural dialogue with AI in your target language",
  },
  {
    icon: Sparkles,
    title: "Instant Corrections",
    description: "Get real-time feedback on grammar and usage",
  },
  {
    icon: BookOpen,
    title: "Vocabulary Tracking",
    description: "Automatically save and review new words you learn",
  },
  {
    icon: Zap,
    title: "Adaptive Difficulty",
    description: "Adjust complexity to match your proficiency level",
  },
  {
    icon: Globe,
    title: "Multiple Scenarios",
    description: "Practice specific situations like travel, dining, or work",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "See your improvement and vocabulary growth over time",
  },
];

export default function HomePage() {
  const router = useRouter();
  const { setLanguage, setDifficulty, selectedLanguage: storedLanguage, selectedDifficulty: storedDifficulty } = useStore();

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(storedLanguage);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"beginner" | "intermediate" | "advanced" | null>(
    storedDifficulty
  );

  // Sync local state with store
  useEffect(() => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  }, [selectedLanguage, setLanguage]);

  useEffect(() => {
    if (selectedDifficulty) {
      setDifficulty(selectedDifficulty);
    }
  }, [selectedDifficulty, setDifficulty]);

  const handleStartLearning = () => {
    if (selectedLanguage && selectedDifficulty) {
      router.push("/scenarios");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Logo size={36} showText={true} />
          </motion.div>
          <ThemeToggle />
        </div>
      </header>

      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 gap-2" variant="secondary">
              <Sparkles className="w-3 h-3" />
              AI-Powered Language Learning
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Master Any Language
              <br />
              Through Conversation
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Practice real conversations, receive instant feedback, and build
              confidence in your target language with our AI-powered learning
              companion.
            </p>
          </motion.div>

          {/* Language Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-semibold text-center mb-6">
              Choose Your Language
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                      selectedLanguage === lang.code
                        ? "ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-950/30"
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => setSelectedLanguage(lang.code)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-2">{lang.flag}</div>
                      <div className="font-semibold text-sm">{lang.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {lang.native}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Difficulty Selection */}
          {selectedLanguage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-semibold text-center mb-6">
                Select Your Level
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {difficulties.map((diff, index) => (
                  <motion.div
                    key={diff.level}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                        selectedDifficulty === diff.level
                          ? "ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-950/30"
                          : "hover:bg-accent/50"
                      }`}
                      onClick={() => setSelectedDifficulty(diff.level)}
                    >
                      <CardContent className="p-6">
                        <div className="text-3xl mb-2">{diff.icon}</div>
                        <h4 className="font-semibold text-lg mb-1">
                          {diff.label}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {diff.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA Button */}
          {selectedLanguage && selectedDifficulty && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={handleStartLearning}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all gap-2 text-lg px-8 py-6"
              >
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 bg-background/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why LinguaChat?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 LinguaChat. Built with Next.js, OpenAI, and ❤️</p>
        </footer>
      </main>
    </div>
  );
}
