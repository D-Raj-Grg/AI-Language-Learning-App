# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LinguaChat** is an AI-powered language learning application built with Next.js 16, React 19, and TypeScript. Users practice real conversations in 5 languages (Spanish, French, German, Italian, Japanese) with AI, receiving instant corrections and vocabulary tracking.

**Current Status**: Foundation complete (Next.js, branding, landing page). In Sprint 1 of MVP development (building chat interface and OpenAI integration).

## Essential Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Building
npm run build        # Production build (must succeed before commits)

# Linting
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript errors without emitting files
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 16 (App Router, React Server Components)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with CSS variables
- **Components**: shadcn/ui (New York style) + AI Elements
- **State Management**: Zustand (planned, not yet implemented)
- **AI Integration**: OpenAI SDK + Vercel AI SDK (`useChat` hook)
- **Animations**: Framer Motion
- **Theme**: next-themes (dark mode support)

### Project Structure

```
app/
├── layout.tsx                  # Root layout with metadata, ThemeProvider
├── page.tsx                    # Landing page (language/difficulty selection)
├── scenarios/                  # [NOT YET BUILT] Scenario selection
├── chat/                       # [NOT YET BUILT] Chat interface
├── vocabulary/                 # [NOT YET BUILT] Vocabulary dashboard
└── api/
    └── chat/                   # [NOT YET BUILT] OpenAI streaming endpoint

components/
├── ui/                         # shadcn/ui components (Button, Card, etc.)
├── ai-elements/                # AI-specific components from @ai-elements
├── logo.tsx                    # Reusable Logo component
├── theme-provider.tsx          # next-themes wrapper
└── theme-toggle.tsx            # Light/Dark/System mode toggle

lib/
├── utils.ts                    # cn() utility for className merging
├── openai.ts                   # [PLANNED] OpenAI client setup
├── prompts.ts                  # [PLANNED] System prompt builders
├── scenarios.ts                # [PLANNED] 7 scenario definitions
└── store.ts                    # [PLANNED] Zustand global state

public/
├── logo.svg                    # Main brand logo (120x120)
├── favicon.svg                 # Browser favicon
└── og-image.svg                # Social sharing image (1200x630)
```

### State Management Pattern (Planned)

Use **Zustand** for global state. The store will be structured as:

```typescript
interface AppState {
  // User selections
  selectedLanguage: string | null
  selectedDifficulty: 'beginner' | 'intermediate' | 'advanced' | null
  selectedScenario: Scenario | null

  // Conversation data
  messages: Message[]
  corrections: Correction[]
  vocabulary: VocabularyItem[]

  // UI state
  isCorrectionsVisible: boolean
  isTyping: boolean
}
```

**Important**: Persist user selections to localStorage, but NOT the full conversation (sessions are ephemeral in MVP).

### OpenAI Integration Pattern

**System Prompt Structure** (per `PLANNING.md`):
- Language specification
- Difficulty parameters (vocabulary complexity, grammar rules)
- Scenario context from selected scenario
- Response format: JSON with `message`, `corrections[]`, `vocabulary[]`

**API Route** (`/api/chat/route.ts`):
- Use OpenAI SDK with `stream: true`
- Temperature: 0.7 for natural conversation
- Max tokens: 500 per response
- Rate limiting: 10 requests/minute per session (IP-based or session ID)

**Frontend Integration**:
- Use Vercel AI SDK's `useChat` hook for streaming
- Display responses token-by-token for real-time feel
- Show typing indicator while AI responds
- Handle errors gracefully with retry option

### Design System

**Color Palette**:
- Primary: Purple (#9333ea) to Blue (#3b82f6) gradient
- Background Light: Soft gray (bg-gray-50)
- Background Dark: Deep slate (bg-slate-950) - **default theme**
- Accents: Emerald (success), Rose (corrections)

**Typography**:
- System fonts (not Google Fonts due to network considerations)
- Minimum 16px for body text
- Gradient text for headings using `bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`

**Component Aesthetics**:
- Glassmorphism: Use `backdrop-blur-md` with `bg-background/80`
- Rounded corners: `rounded-xl` for cards, `rounded-full` for pills
- Shadows: Soft shadows, increase on hover
- Animations: Use Framer Motion with `initial`, `animate`, `transition` props

### Component Conventions

**shadcn/ui Components**:
- Installed with `npx shadcn@latest add <component-name>`
- Configuration in `components.json` (New York style, neutral base color)
- Always use the `cn()` utility from `lib/utils.ts` for conditional classNames

**AI Elements**:
- Installed from `@ai-elements/all` registry
- Located in `components/ai-elements/`
- Some components have TypeScript type mismatches with AI SDK - use `@ts-ignore` when needed (see `confirmation.tsx` for examples)

**Logo Component**:
- Reusable with props: `size` (number), `showText` (boolean), `className` (string)
- SVG-based with inline gradients
- Import: `import { Logo } from "@/components/logo"`

### Data Models (TypeScript Interfaces)

Refer to `PRD.md` section 3.3 for complete data models:

```typescript
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  corrections?: Correction[]
  timestamp: Date
}

interface Correction {
  original: string
  corrected: string
  explanation: string
  category: 'grammar' | 'vocabulary' | 'spelling' | 'style'
}

interface VocabularyItem {
  word: string
  translation: string
  context: string  // Sentence from conversation
  learnedAt: Date
}

interface Scenario {
  id: string
  title: string
  description: string
  icon: string
  recommendedDifficulty: string[]
  systemPromptContext: string
}
```

### Critical Performance Requirements

Per `PRD.md` section 3.4:
- **Page load**: < 2 seconds
- **AI response**: < 3 seconds time to first token
- **Streaming latency**: < 100ms between tokens
- **Lighthouse score**: > 90 on performance

Always run `npm run build` before committing to ensure no TypeScript errors or build failures.

### Known Type Fixes

The AI Elements library has type mismatches with the current Vercel AI SDK version. When encountering errors like:

```
Type '"approval-requested"' does not exist in type 'ToolUIPart["state"]'
```

Use inline `@ts-ignore` comments (not `@ts-expect-error`):
```typescript
// @ts-ignore - approval-requested is a valid state in some AI SDK versions
if (state !== "approval-requested") { ... }
```

Or change `Record<ToolUIPart["state"], T>` to `Record<string, T>`.

## Key Planning Documents

- **PRD.md**: Product requirements, user stories, technical specs, implementation phases
- **PLANNING.md**: Product manager's roadmap, sprint breakdown, risk management, success metrics
- **TASKS.md**: Granular task list with checkboxes, milestones, progress tracking

**Always consult TASKS.md** for the current sprint tasks and mark items as complete with `[x]` when done.

## Development Workflow

1. Check `TASKS.md` for current sprint tasks
2. Create components in appropriate directory (`components/chat/`, `components/vocabulary/`, etc.)
3. Use TypeScript interfaces from PRD.md data models
4. Follow design system (purple/blue gradients, glassmorphism, Framer Motion animations)
5. Test dark mode styling
6. Run `npm run build` to verify no errors
7. Update `TASKS.md` checkboxes when tasks complete
8. Commit with descriptive messages following existing pattern

## Styling Patterns

**Glassmorphism Card**:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-border/50">
```

**Gradient Text**:
```tsx
<h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
```

**Hover Effect with Scale**:
```tsx
<motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
```

**Responsive Grid**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## Vercel AI SDK Usage

When implementing chat functionality:

```typescript
import { useChat } from 'ai/react'

const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
  api: '/api/chat',
  initialMessages: [],
})
```

## Environment Variables

Required in `.env.local`:
```
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Never commit `.env.local`. Use `.env.example` as template.

## Current Sprint Focus

**Sprint 1 (Week 1)**: Core Chat Experience
- Build scenario selection page with 7 scenarios
- Create chat interface (header, message list, input)
- Integrate OpenAI with streaming responses
- Implement rate limiting (10 req/min)

See `TASKS.md` Milestone 4 for detailed subtasks.
