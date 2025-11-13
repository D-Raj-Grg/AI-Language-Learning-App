"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScenarioCard } from "@/components/scenarios/ScenarioCard";
import { scenarios } from "@/lib/scenarios";
import { useStore } from "@/lib/store";
import type { Scenario } from "@/lib/scenarios";

export default function ScenariosPage() {
  const router = useRouter();
  const {
    selectedLanguage,
    selectedDifficulty,
    selectedScenario,
    setScenario,
  } = useStore();

  const [localSelectedScenario, setLocalSelectedScenario] =
    useState<Scenario | null>(selectedScenario);

  // Redirect to home if language or difficulty not selected
  useEffect(() => {
    if (!selectedLanguage || !selectedDifficulty) {
      router.push("/");
    }
  }, [selectedLanguage, selectedDifficulty, router]);

  const handleScenarioSelect = (scenario: Scenario) => {
    setLocalSelectedScenario(scenario);
  };

  const handleContinue = () => {
    if (localSelectedScenario) {
      setScenario(localSelectedScenario);
      router.push("/chat");
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  // Get language display name
  const languageNames: Record<string, string> = {
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    ja: "Japanese",
  };

  const languageName = selectedLanguage
    ? languageNames[selectedLanguage]
    : "";

  if (!selectedLanguage || !selectedDifficulty) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Choose Your Scenario
            </h1>
            <Badge variant="secondary" className="text-sm">
              {languageName}
            </Badge>
            <Badge variant="secondary" className="text-sm capitalize">
              {selectedDifficulty}
            </Badge>
          </div>

          <p className="text-muted-foreground text-lg">
            Select a conversation scenario to practice. Each scenario is
            designed to help you learn practical language skills.
          </p>
        </motion.div>

        {/* Scenarios Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ScenarioCard
                scenario={scenario}
                isSelected={localSelectedScenario?.id === scenario.id}
                onClick={() => handleScenarioSelect(scenario)}
                difficulty={selectedDifficulty}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        {localSelectedScenario && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-8 left-0 right-0 flex justify-center px-4"
          >
            <Button
              onClick={handleContinue}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all gap-2 text-lg px-8 py-6"
            >
              Start Conversation
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
