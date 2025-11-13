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

export interface ConversationHistory {
  id: string;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  scenario: Scenario;
  messages: Message[];
  corrections: Correction[];
  startedAt: Date;
  endedAt: Date;
  messageCount: number;
  duration: number; // in seconds
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
  conversationHistory: ConversationHistory[];
  conversationStartTime: number | null;

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

  // Conversation history actions
  startConversation: () => void;
  saveConversation: () => void;
  deleteConversation: (id: string) => void;
  clearHistory: () => void;
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
      conversationHistory: [],
      conversationStartTime: null,
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
          conversationStartTime: null,
          isCorrectionsVisible: true,
          isTyping: false,
        }),

      // Conversation history actions
      startConversation: () =>
        set({ conversationStartTime: Date.now() }),

      saveConversation: () =>
        set((state) => {
          if (!state.selectedLanguage || !state.selectedDifficulty || !state.selectedScenario) {
            return state;
          }

          if (state.messages.length === 0) {
            return state;
          }

          const endTime = Date.now();
          const startTime = state.conversationStartTime || endTime;
          const duration = Math.floor((endTime - startTime) / 1000);

          const conversation: ConversationHistory = {
            id: `conv_${Date.now()}`,
            language: state.selectedLanguage,
            difficulty: state.selectedDifficulty,
            scenario: state.selectedScenario,
            messages: state.messages,
            corrections: state.corrections,
            startedAt: new Date(startTime),
            endedAt: new Date(endTime),
            messageCount: state.messages.length,
            duration,
          };

          return {
            conversationHistory: [conversation, ...state.conversationHistory],
            conversationStartTime: null,
          };
        }),

      deleteConversation: (id) =>
        set((state) => ({
          conversationHistory: state.conversationHistory.filter((c) => c.id !== id),
        })),

      clearHistory: () =>
        set({ conversationHistory: [] }),
    }),
    {
      name: "linguachat-storage",
      // Persist user selections, vocabulary, and conversation history
      partialize: (state) => ({
        selectedLanguage: state.selectedLanguage,
        selectedDifficulty: state.selectedDifficulty,
        selectedScenario: state.selectedScenario,
        vocabulary: state.vocabulary,
        conversationHistory: state.conversationHistory,
        isCorrectionsVisible: state.isCorrectionsVisible,
      }),
    }
  )
);
