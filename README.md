# LinguaChat - AI-Powered Language Learning

<div align="center">
  <img src="public/logo.svg" alt="LinguaChat Logo" width="120" height="120" />

  <p><strong>Master any language through natural conversations with AI</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
</div>

## Overview

LinguaChat is an AI-powered language learning application that helps users practice real conversations in their target language. Get instant feedback, track your vocabulary, and build confidence through natural dialogue with AI.

### Key Features

- **5 Languages**: Spanish, French, German, Italian, Japanese
- **Real-Time Conversations**: Stream AI responses for natural dialogue
- **Instant Corrections**: Get grammar and vocabulary feedback as you chat
- **Vocabulary Tracking**: Build your word collection automatically
- **7 Practice Scenarios**: From casual chat to job interviews
- **3 Difficulty Levels**: Beginner, Intermediate, Advanced
- **Dark Mode**: Beautiful UI that's easy on your eyes
- **Mobile Optimized**: Practice anywhere, anytime

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router & React Server Components
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict mode
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [AI Elements](https://ui.ai)
- **AI**: [OpenAI GPT-4](https://openai.com/) + [Vercel AI SDK](https://sdk.vercel.ai/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with localStorage persistence
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/D-Raj-Grg/AI-Language-Learning-App.git
cd AI-Language-Learning-App
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
# Required: OpenAI API Key
OPENAI_API_KEY=sk-your-api-key-here

# Optional: App URL (for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── chat/          # OpenAI streaming endpoint
│   ├── chat/              # Chat interface
│   ├── scenarios/         # Scenario selection
│   ├── vocabulary/        # Vocabulary dashboard
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ai-elements/      # AI-specific components
│   ├── chat/             # Chat UI components
│   ├── corrections/      # Corrections panel
│   ├── vocabulary/       # Vocabulary components
│   └── scenarios/        # Scenario cards
├── lib/                  # Utilities & configuration
│   ├── store.ts          # Zustand global state
│   ├── openai.ts         # OpenAI client setup
│   ├── prompts.ts        # System prompt builders
│   ├── scenarios.ts      # Scenario definitions
│   └── utils.ts          # Helper functions
└── public/               # Static assets
    ├── logo.svg          # Brand logo
    └── favicon.svg       # Browser icon
```

## Development Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript type checking

# Analysis
ANALYZE=true pnpm build  # Bundle size analysis
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key for GPT-4 access |
| `NEXT_PUBLIC_APP_URL` | No | App URL for CORS and metadata (defaults to localhost) |

## Features in Detail

### Conversation Practice
- Select from 7 real-world scenarios
- AI adapts to your skill level
- Streaming responses for natural flow
- Conversation history within session

### Corrections System
- Real-time grammar feedback
- Category-based corrections (grammar, vocabulary, spelling, style)
- Detailed explanations
- Toggleable corrections panel

### Vocabulary Tracking
- Automatic word extraction
- Translation and context
- Search and filter functionality
- Persistent storage across sessions

### Performance
- Server-side rendering for fast loads
- Optimized bundle size
- Edge runtime for API routes
- Lighthouse score: >90

### Security
- Input sanitization
- Rate limiting (10 req/min)
- CORS protection
- Security headers (HSTS, CSP, X-Frame-Options)
- API key protection

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation

- [Product Requirements Document](PRD.md) - Detailed feature specifications
- [Planning Document](PLANNING.md) - Development roadmap and sprints
- [Task Tracking](TASKS.md) - Granular task list with progress
- [User Guide](USER_GUIDE.md) - How to use the application
- [Claude Instructions](CLAUDE.md) - Development guidelines for AI assistance

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenAI](https://openai.com/) for GPT-4 API
- [Vercel](https://vercel.com/) for hosting and AI SDK
- [shadcn](https://ui.shadcn.com/) for beautiful UI components
- [AI Elements](https://ui.ai) for AI-specific components

## Support

If you encounter any issues or have questions:
- Open an [issue](https://github.com/D-Raj-Grg/AI-Language-Learning-App/issues)
- Check the [User Guide](USER_GUIDE.md)
- Review [TASKS.md](TASKS.md) for known issues

---

<div align="center">
  Made with ❤️ using Next.js and OpenAI
</div>
