# Product Requirements Document: AI Language Learning App

## 1. Product Overview

### 1.1 Product Name
**LinguaChat** - AI-Powered Conversational Language Learning

### 1.2 Vision Statement
An accessible, AI-powered language learning application that helps users practice real conversations, receive instant feedback, and build confidence in their target language through natural dialogue.

### 1.3 Target Audience
- Language learners (beginner to intermediate level)
- Students preparing for language exams
- Professionals needing conversational practice
- Self-learners without access to native speakers

### 1.4 Success Metrics
- User engagement: Average session length > 10 minutes
- Learning progression: Users completing 3+ conversations per week
- Retention: 40% weekly active users
- User satisfaction: NPS score > 50

---

## 2. Core Features (MVP)

### 2.1 Conversation Practice
**Description**: Real-time chat with AI in the target language

**User Stories**:
- As a learner, I want to have natural conversations in my target language so I can practice without fear of judgment
- As a user, I want the AI to respond contextually to keep the conversation flowing naturally

**Acceptance Criteria**:
- Support for 5 major languages initially (Spanish, French, German, Italian, Japanese)
- Streaming responses for real-time feel
- Conversation history preserved within session
- Maximum response time: 3 seconds

### 2.2 Instant Corrections & Feedback
**Description**: Real-time grammar and usage corrections during conversation

**User Stories**:
- As a learner, I want to see my mistakes highlighted so I can learn from them immediately
- As a user, I want explanations for corrections so I understand the grammar rules

**Acceptance Criteria**:
- Corrections appear inline or in a sidebar
- Each correction includes:
  - Original text
  - Corrected version
  - Brief explanation of the error
  - Grammar rule reference (when applicable)
- Toggle to show/hide corrections during conversation

### 2.3 Difficulty Levels
**Description**: Adjustable conversation difficulty to match user proficiency

**User Stories**:
- As a beginner, I want simple conversations so I don't get overwhelmed
- As an intermediate learner, I want more complex vocabulary and grammar

**Levels**:
- **Beginner**: Simple sentences, common vocabulary, present tense focus
- **Intermediate**: More complex sentences, varied tenses, broader vocabulary
- **Advanced**: Native-like complexity, idioms, advanced grammar

**Acceptance Criteria**:
- User can select level before starting conversation
- AI adapts vocabulary and grammar complexity accordingly
- Option to change difficulty mid-conversation

### 2.4 Conversation Scenarios
**Description**: Pre-defined topics and scenarios for structured practice

**User Stories**:
- As a learner, I want to practice specific situations (ordering food, job interviews) so I'm prepared for real-life scenarios

**Initial Scenarios**:
- Casual Introduction & Small Talk
- Ordering at a Restaurant
- Shopping & Asking for Directions
- Travel & Hotel Check-in
- Job Interview Practice
- Everyday Conversations
- Free-form Chat (no specific topic)

**Acceptance Criteria**:
- At least 7 scenarios available at launch
- Each scenario provides context/role to AI
- User can switch scenarios between conversations

### 2.5 Vocabulary Tracking
**Description**: Track new words and phrases learned during conversations

**User Stories**:
- As a learner, I want to review words I've encountered so I can memorize them
- As a user, I want to see my vocabulary growth over time

**Acceptance Criteria**:
- Automatic extraction of key vocabulary from conversations
- Vocabulary list showing:
  - Word/phrase in target language
  - English translation
  - Example sentence from conversation
  - Date first encountered
- Simple statistics (total words learned, words this week)

---

## 3. Technical Requirements

### 3.1 Tech Stack
**Frontend**:
- Next.js 16 (App Router with latest features)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components (minimalistic, accessible)
- Magic UI (for modern animations and effects)
  - Animated backgrounds
  - Smooth transitions
  - Particle effects
  - Gradient animations

**Backend**:
- Next.js API Routes (serverless functions)
- OpenAI API (GPT-4 or GPT-3.5-turbo)

**Deployment**:
- Vercel (hosting + serverless functions)
- Vercel KV or PostgreSQL (for data persistence)

**Additional Libraries**:
- `openai` - Official OpenAI SDK
- `ai` by Vercel - For streaming responses
- `zustand` or `jotai` - State management
- `react-markdown` - For formatted responses
- `framer-motion` - Smooth animations
- `lucide-react` - Modern iconography

### 3.2 API Integration

**OpenAI Configuration**:
```javascript
{
  model: "gpt-4-turbo-preview", // or gpt-3.5-turbo for cost optimization
  temperature: 0.7,
  streaming: true,
  max_tokens: 500
}
```

**System Prompts Structure**:
- Language specification
- Difficulty level parameters
- Scenario context
- Correction instructions
- Vocabulary highlighting instructions

### 3.3 Data Models

**Conversation Session**:
```typescript
{
  id: string
  userId: string // optional for MVP (can use localStorage)
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  scenario: string
  messages: Message[]
  vocabulary: VocabularyItem[]
  createdAt: Date
  updatedAt: Date
}
```

**Message**:
```typescript
{
  id: string
  role: 'user' | 'assistant'
  content: string
  corrections?: Correction[]
  timestamp: Date
}
```

**Correction**:
```typescript
{
  original: string
  corrected: string
  explanation: string
  category: 'grammar' | 'vocabulary' | 'spelling' | 'style'
}
```

**Vocabulary Item**:
```typescript
{
  word: string
  translation: string
  context: string
  learnedAt: Date
}
```

### 3.4 Performance Requirements
- Initial page load: < 2 seconds
- Time to first AI response: < 3 seconds
- Streaming latency: < 100ms between tokens
- Lighthouse score: > 90 on performance

### 3.5 Security & Privacy
- API keys stored in environment variables (never exposed to client)
- Rate limiting on API routes (10 requests per minute per user)
- Input sanitization on all user messages
- Optional: User authentication for data persistence (Auth0 or NextAuth)

---

## 4. User Experience & Design

### 4.1 User Flow

1. **Landing Page**
   - Brief explanation of app
   - Language selection
   - Difficulty level selection
   - CTA: "Start Learning"

2. **Scenario Selection**
   - Grid/list of available scenarios
   - Each scenario shows: title, brief description, difficulty recommendation

3. **Chat Interface**
   - Clean chat layout (WhatsApp/iMessage style)
   - User messages: right-aligned, blue
   - AI messages: left-aligned, gray
   - Input box at bottom with send button
   - Corrections panel (toggleable sidebar or inline)
   - Top bar: scenario name, difficulty, settings icon

4. **Corrections Panel**
   - List of corrections from conversation
   - Expandable for detailed explanations
   - Color-coded by correction type

5. **Vocabulary Dashboard**
   - Searchable/filterable list
   - Statistics cards at top
   - Export functionality (future)

### 4.2 Key UI Components

**ChatMessage Component**:
- Avatar (user/AI)
- Message bubble
- Timestamp
- Correction indicator icon (if applicable)

**CorrectionCard Component**:
- Original text (struck through)
- Corrected text (highlighted)
- Explanation text
- Category badge

**LanguageSelector Component**:
- Dropdown or card grid
- Flag icons for each language
- Language name in native script

**DifficultySelector Component**:
- Three buttons/cards (Beginner, Intermediate, Advanced)
- Brief description of each level

### 4.3 Design Principles & Visual Style

**Design Philosophy**:
- **Minimalist**: Clean interface with purposeful whitespace, no visual clutter
- **Modern**: Blur effects, glassmorphism, subtle gradients
- **Encouraging**: Positive tone with delightful micro-interactions
- **Educational**: Corrections as learning moments with smooth transitions
- **Accessible**: High contrast, readable fonts (16px minimum), keyboard navigation

**Visual Elements**:

**Color Palette**:
- Primary: Indigo/Purple gradient (modern, tech-forward)
- Background: Dark mode default with light mode toggle
  - Dark: Deep slate (bg-slate-950) with subtle noise texture
  - Light: Soft gray (bg-gray-50) with warmth
- Accents: Vibrant but tasteful (emerald for success, rose for corrections)
- Glass effects: backdrop-blur with opacity for depth

**Typography**:
- Headings: Inter or Geist (modern, clean)
- Body: System fonts for optimal readability
- Code/Corrections: JetBrains Mono or Fira Code

**Animations & Effects**:
- **Page transitions**: Smooth fade-ins with slight scale
- **Message appearance**: Slide-up with spring animation
- **Corrections reveal**: Subtle bounce + highlight effect
- **Background**: Animated gradient mesh or particle system
- **Hover states**: Smooth elevation changes, glow effects
- **Loading**: Skeleton screens with shimmer effect

**Component Aesthetics**:
- Cards: Subtle borders, soft shadows, glass effect backgrounds
- Buttons: Modern padding, hover lift effect, gradient on primary CTAs
- Chat bubbles: Rounded corners (xl), shadow depth, smooth scaling on send
- Inputs: Clean focus states, animated border color transitions
- Modals: Centered with backdrop blur, slide-in animation

**Magic UI Integration**:
- Hero section: Animated grid background or dots pattern
- Language cards: Hover tilt effect with shine
- Success states: Confetti or particle burst animations
- Scene transitions: Smooth page morphing
- Typing indicators: Animated dots with bounce

**Dark Mode**:
- Default theme (modern audience preference)
- Toggle in header with sun/moon icon transition
- Smooth theme transition (no flash)
- Adjusted shadows and glows for dark backgrounds

---

## 5. Implementation Phases

### Phase 1: MVP (Week 1-2)
**Goal**: Working prototype with core conversation feature

- [ ] Project setup (Next.js, Tailwind, TypeScript)
- [ ] OpenAI API integration with streaming
- [ ] Basic chat interface
- [ ] Language selection (Spanish only for testing)
- [ ] One difficulty level (intermediate)
- [ ] 3 basic scenarios
- [ ] Deploy to Vercel

### Phase 2: Core Features (Week 3)
**Goal**: Complete correction and vocabulary features

- [ ] Corrections system implementation
- [ ] Corrections UI (sidebar or inline)
- [ ] Vocabulary extraction
- [ ] Vocabulary dashboard
- [ ] All 5 languages supported
- [ ] All 3 difficulty levels

### Phase 3: Polish & Optimization (Week 4)
**Goal**: Production-ready application

- [ ] All 7+ scenarios implemented
- [ ] Loading states and error handling
- [ ] Rate limiting
- [ ] Performance optimization
- [ ] Mobile responsive design
- [ ] User testing and feedback
- [ ] Analytics integration (Vercel Analytics)

### Phase 4: Future Enhancements (Post-MVP)
- User authentication and accounts
- Conversation history (across sessions)
- Speech-to-text input
- Text-to-speech for AI responses
- Flashcard generation from vocabulary
- Progress tracking and streaks
- Spaced repetition system
- Community features (share conversations)

---

## 6. Success Criteria for MVP Launch

### 6.1 Functional Requirements Met
- ✓ Users can have conversations in 5 languages
- ✓ AI responds naturally and contextually
- ✓ Corrections are accurate and helpful
- ✓ Vocabulary is tracked and accessible
- ✓ All scenarios work properly
- ✓ App is responsive on mobile and desktop

### 6.2 Quality Standards
- Zero critical bugs
- 95%+ uptime
- < 3 second response times
- Positive feedback from 10+ beta testers

### 6.3 Launch Readiness
- [ ] Documentation (README, user guide)
- [ ] Privacy policy (if storing user data)
- [ ] Error monitoring setup (Sentry or similar)
- [ ] Analytics tracking
- [ ] Social sharing prepared (og:image, meta tags)

---

## 7. Risk Assessment & Mitigation

### 7.1 Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| OpenAI API costs exceed budget | High | Medium | Implement rate limiting, use GPT-3.5 initially, monitor usage dashboard |
| AI provides incorrect corrections | Medium | Medium | Add disclaimer, implement feedback mechanism, use temperature tuning |
| Poor user engagement | High | Medium | A/B test different scenarios, add gamification, gather user feedback |
| API latency issues | Medium | Low | Use streaming, implement loading states, cache common responses |

### 7.2 Dependencies
- OpenAI API availability and pricing stability
- Vercel platform reliability
- User's internet connection quality

---

## 8. Future Considerations

### 8.1 Monetization (Post-MVP)
- Freemium model: 10 conversations/month free
- Premium: $9.99/month for unlimited conversations
- Pay-per-use: $0.50 per conversation

### 8.2 Scalability
- Move to dedicated database (PostgreSQL on Vercel or Supabase)
- Implement caching for common responses
- Consider fine-tuning custom model for better performance
- CDN for static assets

### 8.3 Localization
- UI translations for non-English speakers
- Support for more languages (Chinese, Arabic, Portuguese, Korean, etc.)
- Regional dialect support

---

## 9. Appendix

### 9.1 Competitive Analysis
- **Duolingo**: Gamified but less conversational
- **HelloTalk**: Real humans but scheduling required
- **ChatGPT directly**: No structure or corrections
- **Our advantage**: Focused, structured, instant feedback, always available

### 9.2 User Personas

**Persona 1: "College Student Emma"**
- Age: 20
- Goal: Pass Spanish class
- Pain point: Too shy to practice with classmates
- Uses app: 3-4x per week before exams

**Persona 2: "Business Traveler David"**
- Age: 35
- Goal: Learn basic French for work trips
- Pain point: No time for traditional classes
- Uses app: Daily during commute

**Persona 3: "Hobbyist Learner Maria"**
- Age: 45
- Goal: Learn Japanese for anime/culture
- Pain point: No native speakers nearby
- Uses app: Weekends, 30+ minute sessions

### 9.3 Technical Constraints
- OpenAI API rate limits: Tier-dependent
- Vercel function timeout: 10 seconds (Hobby), 300 seconds (Pro)
- Vercel KV limits: Check current plan
- Browser localStorage: 5-10MB limit

---

## Document History
- **Version 1.0** - Initial PRD created
- **Date**: November 13, 2025
- **Author**: Product Team
- **Next Review**: After MVP completion
