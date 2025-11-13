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
  CheckCircle2,
  Star,
  Users,
  Clock,
  Award,
  Languages,
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
    title: "7 Real Scenarios",
    description: "Practice specific situations like travel, dining, or work",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "See your improvement and vocabulary growth over time",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Language & Level",
    description: "Select from 5 languages and pick your proficiency level",
  },
  {
    number: "02",
    title: "Pick a Scenario",
    description: "Choose from 7 real-world conversation scenarios",
  },
  {
    number: "03",
    title: "Start Chatting",
    description: "Have natural conversations with AI and get instant feedback",
  },
  {
    number: "04",
    title: "Learn & Improve",
    description: "Review corrections, track vocabulary, and watch your progress",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    content:
      "LinguaChat helped me prepare for my trip to Spain in just 2 weeks. The conversation practice was incredibly helpful!",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Student",
    content:
      "As a language student, this is the perfect supplement to my classes. The instant corrections are game-changing.",
    rating: 5,
  },
  {
    name: "Yuki Tanaka",
    role: "Business Owner",
    content:
      "I use it every morning to practice my French. The scenarios are realistic and the AI feels like a real tutor.",
    rating: 5,
  },
];

const stats = [
  { value: "5", label: "Languages", icon: Languages },
  { value: "7", label: "Scenarios", icon: Globe },
  { value: "24/7", label: "Available", icon: Clock },
  { value: "100%", label: "Free", icon: Award },
];

export default function HomePage() {
  const router = useRouter();
  const { setLanguage, setDifficulty, selectedLanguage: storedLanguage, selectedDifficulty: storedDifficulty } = useStore();

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(storedLanguage);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"beginner" | "intermediate" | "advanced" | null>(
    storedDifficulty
  );

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
      <header className="relative z-10 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Logo size={36} showText={true} />
          </motion.div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-purple-600 transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge className="mb-6 gap-2 px-4 py-2 text-sm" variant="secondary">
                <Sparkles className="w-4 h-4" />
                AI-Powered Language Learning
              </Badge>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Master Languages
              </span>
              <br />
              <span className="text-foreground">Through Conversation</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Practice real conversations, receive instant feedback, and build
              confidence in your target language with our AI-powered learning companion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById("start-learning")?.scrollIntoView({ behavior: "smooth" })}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all gap-2 text-lg px-8 py-6"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                size="lg"
                variant="outline"
                className="gap-2 text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20 md:py-32 bg-background/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="outline">
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Learn Faster
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powered by advanced AI technology to give you a personalized learning experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center mb-5">
                        <feature.icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-xl mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="outline">
                Simple Process
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                How{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  It Works
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start learning in just a few simple steps
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <Card className="mb-8 overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50 transition-colors">
                    <CardContent className="p-8 md:p-10">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                            {step.number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                        <CheckCircle2 className="hidden md:block w-8 h-8 text-green-500 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-8 top-full w-0.5 h-8 bg-gradient-to-b from-purple-600 to-blue-600 -translate-y-4" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="container mx-auto px-4 py-20 md:py-32 bg-background/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="outline">
                Testimonials
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Loved by{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Language Learners
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See what our users have to say about their learning experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-8">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed italic">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Start Learning Section */}
        <section id="start-learning" className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4" variant="outline">
              Get Started
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Learning Journey?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Choose your language and level to begin practicing conversations
            </p>
          </motion.div>

          {/* Language Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-semibold text-center mb-8">
              Choose Your Language
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-xl ${
                      selectedLanguage === lang.code
                        ? "ring-2 ring-purple-600 bg-purple-50 dark:bg-purple-950/30 shadow-lg"
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => setSelectedLanguage(lang.code)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-3">{lang.flag}</div>
                      <div className="font-semibold text-base mb-1">{lang.name}</div>
                      <div className="text-sm text-muted-foreground">
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
              className="mt-16"
            >
              <h3 className="text-2xl font-semibold text-center mb-8">
                Select Your Level
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {difficulties.map((diff, index) => (
                  <motion.div
                    key={diff.level}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-xl ${
                        selectedDifficulty === diff.level
                          ? "ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-950/30 shadow-lg"
                          : "hover:bg-accent/50"
                      }`}
                      onClick={() => setSelectedDifficulty(diff.level)}
                    >
                      <CardContent className="p-8 text-center">
                        <div className="text-4xl mb-4">{diff.icon}</div>
                        <h4 className="font-semibold text-xl mb-2">
                          {diff.label}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
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
              className="mt-12 text-center"
            >
              <Button
                onClick={handleStartLearning}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-purple-500/50 transition-all gap-3 text-xl px-12 py-7"
              >
                Start Learning Now
                <ArrowRight className="w-6 h-6" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • Start practicing immediately
              </p>
            </motion.div>
          )}
        </section>

        {/* Final CTA Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 border-none">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <CardContent className="relative p-12 md:p-16 text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Join Thousands of Language Learners
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Start your journey to fluency today with AI-powered conversations
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => document.getElementById("start-learning")?.scrollIntoView({ behavior: "smooth" })}
                    size="lg"
                    variant="secondary"
                    className="gap-2 text-lg px-8 py-6 bg-white text-purple-600 hover:bg-gray-100"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Logo size={36} showText={true} />
              <p className="text-muted-foreground mt-4 max-w-sm">
                AI-powered language learning through natural conversations. Master Spanish, French, German, Italian, and Japanese.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-purple-600 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-purple-600 transition-colors">How It Works</a></li>
                <li><a href="/scenarios" className="hover:text-purple-600 transition-colors">Scenarios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/D-Raj-Grg/AI-Language-Learning-App" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">GitHub</a></li>
                <li><a href="https://github.com/D-Raj-Grg/AI-Language-Learning-App/issues" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">Report Issue</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>© 2025 LinguaChat. Built with Next.js, OpenAI, and ❤️ by <a href="https://github.com/D-Raj-Grg" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">D-Raj-Grg</a></p>
          </div>
        </footer>
      </main>
    </div>
  );
}
