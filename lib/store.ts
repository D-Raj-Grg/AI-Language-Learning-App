import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Scenario } from "./scenarios";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  corrections?: Correction[];
  timestamp: Date;
}

export interface Correction {
  id: string;
  original: string;
  corrected: string;
  explanation: string;
  category: "grammar" | "vocabulary" | "spelling" | "style";
  messageId: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  context: string;
  language: string;
  learnedAt: Date;
  reviewCount: number;
}

interface AppState {
  // User selections
  selectedLanguage: string | null;
  selectedDifficulty: "beginner" | "intermediate" | "advanced" | null;
  selectedScenario: Scenario | null;

  // Conversation data (ephemeral - not persisted)
  messages: Message[];
  corrections: Correction[];
  vocabulary: VocabularyItem[];

  // UI state
  isCorrectionsVisible: boolean;
  isTyping: boolean;

  // Actions for selections
  setLanguage: (language: string) => void;
  setDifficulty: (difficulty: "beginner" | "intermediate" | "advanced") => void;
  setScenario: (scenario: Scenario) => void;

  // Actions for conversation
  addMessage: (message: Message) => void;
  addCorrection: (correction: Correction) => void;
  addVocabulary: (item: VocabularyItem) => void;
  setIsTyping: (isTyping: boolean) => void;
  toggleCorrectionsVisibility: () => void;

  // Clear conversation
  clearConversation: () => void;
  resetAll: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      selectedLanguage: null,
      selectedDifficulty: null,
      selectedScenario: null,
      messages: [],
      corrections: [],
      vocabulary: [],
      isCorrectionsVisible: true,
      isTyping: false,

      // Selection actions
      setLanguage: (language) => set({ selectedLanguage: language }),
      setDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
      setScenario: (scenario) => set({ selectedScenario: scenario }),

      // Conversation actions
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      addCorrection: (correction) =>
        set((state) => ({ corrections: [...state.corrections, correction] })),
      addVocabulary: (item) =>
        set((state) => {
          // Prevent duplicates
          const exists = state.vocabulary.some((v) => v.word === item.word);
          if (exists) return state;
          return { vocabulary: [...state.vocabulary, item] };
        }),
      setIsTyping: (isTyping) => set({ isTyping }),
      toggleCorrectionsVisibility: () =>
        set((state) => ({
          isCorrectionsVisible: !state.isCorrectionsVisible,
        })),

      // Clear actions
      clearConversation: () =>
        set({
          messages: [],
          corrections: [],
          isTyping: false,
        }),
      resetAll: () =>
        set({
          selectedLanguage: null,
          selectedDifficulty: null,
          selectedScenario: null,
          messages: [],
          corrections: [],
          vocabulary: [],
          isCorrectionsVisible: true,
          isTyping: false,
        }),
    }),
    {
      name: "linguachat-storage",
      // Only persist user selections and vocabulary, not conversation data
      partialize: (state) => ({
        selectedLanguage: state.selectedLanguage,
        selectedDifficulty: state.selectedDifficulty,
        selectedScenario: state.selectedScenario,
        vocabulary: state.vocabulary,
        isCorrectionsVisible: state.isCorrectionsVisible,
      }),
    }
  )
);
