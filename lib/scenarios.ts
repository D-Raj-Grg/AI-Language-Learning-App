export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  recommendedDifficulty: ("beginner" | "intermediate" | "advanced")[];
  systemPromptContext: string;
}

export const scenarios: Scenario[] = [
  {
    id: "casual-intro",
    title: "Casual Introduction & Small Talk",
    description: "Practice introducing yourself and making light conversation. Perfect for meeting new people and building confidence in everyday interactions.",
    icon: "👋",
    recommendedDifficulty: ["beginner", "intermediate"],
    systemPromptContext: "You are having a casual conversation with a friendly person you just met. They want to get to know you through natural small talk. Keep the conversation light, ask about their interests, hobbies, and daily life. Be warm and encouraging.",
  },
  {
    id: "restaurant",
    title: "Ordering at a Restaurant",
    description: "Learn to order food, ask about menu items, and handle restaurant situations. Practice vocabulary for meals, drinks, and dietary preferences.",
    icon: "🍽️",
    recommendedDifficulty: ["beginner", "intermediate"],
    systemPromptContext: "You are a friendly waiter/waitress at a restaurant. Help the customer order food, explain menu items, make recommendations, and handle special requests. Use common restaurant vocabulary and be patient with questions about ingredients or preparation.",
  },
  {
    id: "shopping-directions",
    title: "Shopping & Asking for Directions",
    description: "Navigate stores, ask for help finding items, and get directions around town. Essential skills for traveling and daily errands.",
    icon: "🛍️",
    recommendedDifficulty: ["beginner", "intermediate"],
    systemPromptContext: "You are either a helpful shop assistant or a local giving directions. Help the person find what they're looking for, describe locations, give clear directions, and answer questions about prices, sizes, or routes. Use spatial language and be descriptive.",
  },
  {
    id: "travel-hotel",
    title: "Travel & Hotel Check-in",
    description: "Handle hotel reservations, check-ins, and travel arrangements. Learn vocabulary for accommodations, transportation, and tourist activities.",
    icon: "✈️",
    recommendedDifficulty: ["intermediate", "advanced"],
    systemPromptContext: "You are a hotel receptionist or travel agent. Help the customer with their reservation, check-in process, room preferences, and provide information about local attractions. Handle any concerns professionally and offer travel tips.",
  },
  {
    id: "job-interview",
    title: "Job Interview Practice",
    description: "Prepare for professional interviews. Practice answering common questions, discussing your skills, and asking about the position.",
    icon: "💼",
    recommendedDifficulty: ["intermediate", "advanced"],
    systemPromptContext: "You are a hiring manager conducting a job interview. Ask about the candidate's experience, skills, strengths, and career goals. Be professional but friendly. Provide opportunities for them to ask questions about the role and company.",
  },
  {
    id: "everyday-conversations",
    title: "Everyday Conversations",
    description: "Practice common daily situations like talking about weather, making plans, discussing hobbies, and sharing opinions on various topics.",
    icon: "💬",
    recommendedDifficulty: ["beginner", "intermediate", "advanced"],
    systemPromptContext: "You are a friendly conversation partner. Discuss everyday topics naturally - weather, weekend plans, hobbies, current events, food, entertainment, etc. Adjust your vocabulary and complexity to match the learner's level. Keep conversations engaging and relatable.",
  },
  {
    id: "free-form",
    title: "Free-form Chat",
    description: "Open conversation on any topic you choose. Great for practicing spontaneous dialogue and exploring subjects you're interested in.",
    icon: "🌟",
    recommendedDifficulty: ["beginner", "intermediate", "advanced"],
    systemPromptContext: "You are a versatile conversation partner ready to discuss any topic the learner brings up. Be flexible, encouraging, and adapt to their interests. Help them explore new vocabulary naturally through the conversation. Follow their lead while keeping the dialogue flowing.",
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}
