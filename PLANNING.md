# LinguaChat - Product Development Plan

**Document Owner**: Product Management Team
**Last Updated**: November 13, 2025
**Status**: Active Development - Foundation Phase Complete
**Target Launch**: Week 4 (MVP)

---

## Executive Summary

LinguaChat is an AI-powered language learning application that enables users to practice real conversations in 5 languages (Spanish, French, German, Italian, Japanese) with instant feedback and corrections. We're building a minimalist, modern web application using Next.js 16, OpenAI GPT-4, and the Vercel AI SDK.

### Current Progress
- ✅ **Foundation (100%)**: Project setup, tech stack configured
- ✅ **Branding (100%)**: Logo, favicon, metadata, SEO optimization
- ✅ **Landing Page (100%)**: Hero section, language/difficulty selection, features showcase
- 🔄 **MVP Phase 1 (20%)**: Core infrastructure ready, conversation UI pending
- ⏳ **MVP Phase 2 (0%)**: Corrections and vocabulary features
- ⏳ **Polish (0%)**: Testing, optimization, deployment

### Key Objectives for Next 2 Weeks
1. Build scenario selection page (Week 1)
2. Implement chat interface with OpenAI streaming (Week 1-2)
3. Add corrections system (Week 2)
4. Deploy MVP to Vercel (Week 2)

---

## Development Roadmap

### 🎯 Sprint 1: Core Chat Experience (Week 1)
**Goal**: Users can select a scenario and have a basic conversation with AI

#### User Stories
- ✅ As a user, I can select my target language and difficulty level
- ⏳ As a user, I can choose from 7 conversation scenarios
- ⏳ As a user, I can chat with AI in my target language
- ⏳ As a user, I receive streaming AI responses within 3 seconds

#### Tasks Breakdown

**Day 1-2: Scenario Selection Page**
- [ ] Create `/scenarios` route and page component
- [ ] Build ScenarioCard component with:
  - Title, description, difficulty badge
  - Icon/emoji for visual identity
  - Hover effects and animations
  - Click handler for navigation
- [ ] Implement 7 scenario definitions:
  ```typescript
  {
    id: string
    title: string
    description: string
    systemPrompt: string
    recommendedDifficulty: string
    icon: string
  }
  ```
- [ ] Add state management for selected language/difficulty
- [ ] Route to `/chat` with query params

**Day 3-5: Chat Interface**
- [ ] Create `/chat` route and page component
- [ ] Design chat layout:
  - Header: scenario name, difficulty, settings
  - Message list with scroll-to-bottom
  - Input area with send button
  - Loading states
- [ ] Build ChatMessage component:
  - User messages (right-aligned, purple gradient)
  - AI messages (left-aligned, gray)
  - Avatar icons
  - Timestamp
  - Typing indicator
- [ ] Implement message input:
  - Textarea with auto-resize
  - Send on Enter (Shift+Enter for newline)
  - Character limit indicator
  - Disabled state during AI response

**Day 6-7: OpenAI Integration**
- [ ] Create `/api/chat` route handler
- [ ] Set up OpenAI client with streaming
- [ ] Implement system prompt builder:
  - Language parameter
  - Difficulty level adjustments
  - Scenario context
  - Conversation rules
- [ ] Add Vercel AI SDK `useChat` hook
- [ ] Handle streaming responses
- [ ] Error handling and retry logic
- [ ] Rate limiting (10 req/min per session)

**Testing & Acceptance**
- [ ] Test all 5 languages
- [ ] Verify streaming works smoothly
- [ ] Confirm 3-second response time
- [ ] Mobile responsiveness check
- [ ] Error states display correctly

---

### 🎯 Sprint 2: Corrections & Vocabulary (Week 2)
**Goal**: AI provides instant corrections and tracks new vocabulary

#### User Stories
- ⏳ As a learner, I see corrections highlighted in my messages
- ⏳ As a learner, I can view explanations for each correction
- ⏳ As a learner, I can track vocabulary learned during conversations
- ⏳ As a user, I can toggle corrections on/off

#### Tasks Breakdown

**Day 1-3: Corrections System**
- [ ] Update OpenAI prompt to generate corrections
- [ ] Design correction response format:
  ```typescript
  {
    message: string
    corrections: [
      {
        original: string
        corrected: string
        explanation: string
        category: 'grammar' | 'vocabulary' | 'spelling' | 'style'
      }
    ]
  }
  ```
- [ ] Build CorrectionPanel component (sidebar):
  - Toggleable visibility
  - List of corrections
  - Expandable cards
  - Color-coded badges by category
  - Animation on new corrections
- [ ] Add correction indicators to messages
- [ ] Implement toggle in header
- [ ] Store corrections in conversation state

**Day 4-6: Vocabulary Tracking**
- [ ] Extract vocabulary from AI responses
- [ ] Create vocabulary data model:
  ```typescript
  {
    word: string
    translation: string
    context: string (sentence from conversation)
    learnedAt: Date
  }
  ```
- [ ] Build VocabularyDashboard component:
  - Stats cards (total words, words this week)
  - Searchable list
  - Word cards with translation & context
  - Date added
- [ ] Add `/vocabulary` route
- [ ] Implement localStorage persistence
- [ ] Navigation link in header

**Day 7: Testing & Integration**
- [ ] Test correction accuracy across languages
- [ ] Verify vocabulary extraction
- [ ] Performance testing with long conversations
- [ ] Fix any bugs discovered
- [ ] User acceptance testing

---

### 🎯 Sprint 3: Polish & Launch Prep (Week 3-4)
**Goal**: Production-ready MVP with excellent UX

#### User Stories
- ⏳ As a user, I experience smooth animations throughout
- ⏳ As a user, errors are handled gracefully
- ⏳ As a user, the app works perfectly on mobile
- ⏳ As a user, I can share my progress on social media

#### Tasks Breakdown

**Week 3: UX Polish**
- [ ] Add loading skeletons for all async operations
- [ ] Implement error boundaries
- [ ] Add toast notifications for user actions
- [ ] Enhance animations:
  - Message send animation
  - Correction reveal
  - Page transitions
- [ ] Mobile optimization:
  - Touch-friendly input
  - Responsive corrections panel
  - Mobile keyboard handling
- [ ] Accessibility audit:
  - Screen reader testing
  - Keyboard navigation
  - ARIA labels
  - Color contrast validation
- [ ] Add conversation history (session-based)
- [ ] Implement "New Conversation" flow

**Week 4: Launch Readiness**
- [ ] Performance optimization:
  - Code splitting
  - Image optimization
  - Bundle size analysis
  - Lighthouse audit (target: 90+)
- [ ] Security hardening:
  - Rate limiting implementation
  - Input sanitization
  - API key protection verification
  - CORS configuration
- [ ] Analytics integration:
  - Vercel Analytics
  - Custom event tracking
  - Conversion funnel setup
- [ ] Documentation:
  - User guide / FAQ
  - README update
  - API documentation
- [ ] Beta testing:
  - Recruit 10 testers
  - Gather feedback
  - Prioritize fixes
- [ ] Deploy to production:
  - Environment variables setup
  - Domain configuration
  - SSL certificate
  - CDN setup

---

## Technical Architecture

### Frontend Structure
```
app/
├── page.tsx                    # ✅ Landing page
├── layout.tsx                  # ✅ Root layout with metadata
├── scenarios/
│   └── page.tsx               # ⏳ Scenario selection
├── chat/
│   └── page.tsx               # ⏳ Chat interface
├── vocabulary/
│   └── page.tsx               # ⏳ Vocabulary dashboard
└── api/
    ├── chat/
    │   └── route.ts           # ⏳ Chat API endpoint
    └── vocabulary/
        └── route.ts           # ⏳ Vocabulary extraction

components/
├── ui/                        # ✅ shadcn/ui components
├── ai-elements/               # ✅ AI-specific components
├── chat/
│   ├── ChatMessage.tsx        # ⏳ Message display
│   ├── ChatInput.tsx          # ⏳ Message input
│   ├── TypingIndicator.tsx   # ⏳ Loading state
│   └── MessageList.tsx        # ⏳ Scrollable messages
├── corrections/
│   ├── CorrectionPanel.tsx    # ⏳ Sidebar panel
│   └── CorrectionCard.tsx     # ⏳ Individual correction
├── vocabulary/
│   ├── VocabularyCard.tsx     # ⏳ Word display
│   └── StatsCard.tsx          # ⏳ Statistics
└── scenarios/
    └── ScenarioCard.tsx       # ⏳ Scenario selection

lib/
├── openai.ts                  # ⏳ OpenAI client setup
├── prompts.ts                 # ⏳ System prompt builders
├── vocabulary-extractor.ts    # ⏳ NLP for vocabulary
└── store.ts                   # ⏳ Zustand store
```

### State Management Strategy

**Zustand Store Structure**:
```typescript
interface AppState {
  // User preferences
  selectedLanguage: string | null
  selectedDifficulty: 'beginner' | 'intermediate' | 'advanced' | null
  selectedScenario: Scenario | null

  // Conversation state
  messages: Message[]
  corrections: Correction[]
  vocabulary: VocabularyItem[]

  // UI state
  isCorrectionsVisible: boolean
  isTyping: boolean

  // Actions
  setLanguage: (lang: string) => void
  setDifficulty: (diff: string) => void
  addMessage: (message: Message) => void
  addCorrection: (correction: Correction) => void
  addVocabulary: (item: VocabularyItem) => void
  clearConversation: () => void
}
```

### OpenAI Integration Pattern

**System Prompt Template**:
```typescript
const buildSystemPrompt = (language: string, difficulty: string, scenario: Scenario) => `
You are a friendly ${language} language tutor helping a ${difficulty}-level learner.

Context: ${scenario.description}

Rules:
1. Respond in ${language} only
2. Adjust complexity to ${difficulty} level:
   - Beginner: Simple sentences, present tense, common words
   - Intermediate: Varied tenses, broader vocabulary
   - Advanced: Idioms, complex grammar, native expressions
3. Keep responses under 100 words
4. Be encouraging and supportive

After each user message, also provide:
- Corrections for any errors (grammar, spelling, usage)
- Key vocabulary words they used correctly
- Brief explanations in English

Format your response as JSON:
{
  "message": "Your response in ${language}",
  "corrections": [
    {
      "original": "incorrect text",
      "corrected": "correct text",
      "explanation": "why it was wrong",
      "category": "grammar|vocabulary|spelling|style"
    }
  ],
  "vocabulary": [
    {
      "word": "palabra",
      "translation": "word",
      "context": "sentence where it appeared"
    }
  ]
}
`;
```

---

## Resource Allocation

### Development Team
- **Frontend Developer**: Chat UI, components, animations
- **Backend Developer**: API routes, OpenAI integration
- **Designer**: UI polish, mobile optimization
- **QA Engineer**: Testing, bug reporting (Week 3-4)

### Time Estimates
| Task | Hours | Priority |
|------|-------|----------|
| Scenario Selection | 8 | P0 |
| Chat Interface | 16 | P0 |
| OpenAI Integration | 12 | P0 |
| Corrections System | 16 | P0 |
| Vocabulary Tracking | 12 | P1 |
| Vocabulary Dashboard | 8 | P1 |
| Mobile Optimization | 12 | P1 |
| Testing & Bug Fixes | 16 | P0 |
| Performance Optimization | 8 | P2 |
| Analytics | 4 | P2 |
| Documentation | 6 | P2 |

**Total**: ~120 hours (~3 weeks for 1 developer, or 1.5 weeks for 2 developers)

---

## Risk Management

### High Priority Risks

**1. OpenAI API Costs**
- **Risk**: Streaming responses may exceed budget
- **Mitigation**:
  - Start with GPT-3.5-turbo ($0.001/1K tokens)
  - Implement strict rate limiting (10 req/min)
  - Monitor usage daily via OpenAI dashboard
  - Set up billing alerts at $50, $100, $200
  - Cache common greetings/responses
- **Owner**: Backend Dev
- **Status**: Monitor continuously

**2. Correction Accuracy**
- **Risk**: AI may provide incorrect grammar corrections
- **Mitigation**:
  - Add disclaimer: "AI-generated feedback may contain errors"
  - Temperature set to 0.3 for corrections (more deterministic)
  - User feedback button to report bad corrections
  - Manual review of common corrections weekly
- **Owner**: Product Manager
- **Status**: Implement in Sprint 2

**3. Performance on Mobile**
- **Risk**: Streaming may lag on slow connections
- **Mitigation**:
  - Implement progressive enhancement
  - Show skeleton loaders immediately
  - Optimize bundle size (<200KB initial)
  - Test on 3G network simulation
- **Owner**: Frontend Dev
- **Status**: Test in Sprint 3

### Medium Priority Risks

**4. User Engagement**
- **Risk**: Users don't return after first session
- **Mitigation**:
  - Gamification elements (coming soon badge)
  - Email reminders (post-MVP)
  - Progress tracking visualization
  - Social sharing features
- **Owner**: Product Manager
- **Timeline**: Phase 4

**5. Scalability**
- **Risk**: Database needs if traffic grows
- **Mitigation**:
  - Start with localStorage (fine for MVP)
  - Plan migration to Vercel KV
  - Monitor Vercel function execution times
- **Owner**: Backend Dev
- **Timeline**: Post-launch if needed

---

## Testing Strategy

### Unit Testing
- [ ] Prompt builder functions
- [ ] Vocabulary extraction logic
- [ ] Message formatting utilities
- [ ] State management actions

**Framework**: Vitest
**Coverage Target**: 70%

### Integration Testing
- [ ] API route responses
- [ ] OpenAI streaming flow
- [ ] Chat message persistence
- [ ] Corrections generation

**Framework**: Playwright
**Key Flows**: 5 critical paths

### End-to-End Testing
- [ ] Complete user journey (landing → scenario → chat → vocabulary)
- [ ] All 5 languages
- [ ] All 3 difficulty levels
- [ ] Mobile responsive testing

**Framework**: Playwright
**Devices**: Desktop, iPhone 13, iPad

### Manual Testing Checklist
- [ ] Cross-browser (Chrome, Safari, Firefox, Edge)
- [ ] Accessibility with screen reader
- [ ] Performance on slow 3G
- [ ] Error scenarios (API failure, network issues)
- [ ] Social media sharing preview

---

## Launch Checklist

### Pre-Launch (Week 4)
- [ ] All P0 features complete and tested
- [ ] Performance: Lighthouse score >90
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Security: Rate limiting active, API keys secured
- [ ] Analytics: Events tracking correctly
- [ ] Error monitoring: Sentry configured
- [ ] Domain: Custom domain configured (if applicable)
- [ ] SEO: Meta tags, sitemap, robots.txt
- [ ] Legal: Privacy policy, terms of service (if storing data)
- [ ] Beta testing: 10 users tested, feedback incorporated

### Launch Day
- [ ] Deploy to production
- [ ] Smoke test on production URL
- [ ] Monitor error rates
- [ ] Monitor API costs
- [ ] Social media announcement
- [ ] Product Hunt submission (optional)
- [ ] Submit to language learning directories

### Post-Launch (Week 1)
- [ ] Daily monitoring of:
  - Error rates
  - API costs
  - User engagement metrics
  - Performance metrics
- [ ] User feedback collection
- [ ] Bug prioritization
- [ ] Plan Phase 4 features based on data

---

## Success Metrics & KPIs

### North Star Metric
**Weekly Active Conversations**: Target 100 conversations/week by end of Month 1

### Leading Indicators
| Metric | Target | Measurement |
|--------|--------|-------------|
| Average Session Length | >10 minutes | Vercel Analytics |
| Conversation Completion Rate | >70% | Custom event |
| Corrections per Conversation | 3-5 | Database query |
| Vocabulary Words Saved | >5 per session | Custom event |
| Mobile Usage | >50% | Analytics |

### Lagging Indicators
| Metric | Target | Measurement |
|--------|--------|-------------|
| Week 1 Retention | >40% | Cohort analysis |
| NPS Score | >50 | In-app survey |
| API Response Time | <3 seconds | Server logs |
| Error Rate | <1% | Sentry |
| Lighthouse Performance | >90 | CI/CD check |

### Data Collection Plan
```typescript
// Track key events
analytics.track('conversation_started', {
  language: string,
  difficulty: string,
  scenario: string
})

analytics.track('message_sent', {
  language: string,
  messageLength: number
})

analytics.track('correction_viewed', {
  category: string
})

analytics.track('vocabulary_saved', {
  language: string,
  wordCount: number
})
```

---

## Dependencies & Blockers

### External Dependencies
| Dependency | Status | Owner | Notes |
|------------|--------|-------|-------|
| OpenAI API Access | ✅ Active | Backend | Rate limits: Tier 1 |
| Vercel Hosting | ✅ Active | DevOps | Hobby plan sufficient for MVP |
| Domain Name | ⏳ Pending | Product | Optional for MVP |
| Analytics Platform | ⏳ TBD | Product | Vercel Analytics or Plausible |

### Internal Blockers
- None currently identified

### Decision Points
| Decision | Options | Deadline | Owner |
|----------|---------|----------|-------|
| Database for persistence | localStorage vs Vercel KV vs Supabase | Week 3 | Backend Dev |
| Analytics platform | Vercel Analytics vs Plausible vs Mixpanel | Week 3 | Product Manager |
| Authentication approach | NextAuth vs Clerk vs Auth0 | Phase 4 | Backend Dev |

---

## Communication Plan

### Daily Standups
- **Time**: 9:00 AM
- **Duration**: 15 minutes
- **Format**: What did you do? What will you do? Any blockers?

### Weekly Sprint Reviews
- **Day**: Friday 3:00 PM
- **Attendees**: Full team + stakeholders
- **Agenda**: Demo completed work, discuss next sprint

### Stakeholder Updates
- **Frequency**: Weekly email
- **Format**: Progress, metrics, risks, next week's goals
- **Owner**: Product Manager

---

## Phase 4: Future Roadmap (Post-MVP)

### Q1 2026 - Growth Features
- [ ] User authentication (save across devices)
- [ ] Conversation history
- [ ] Progress tracking & streaks
- [ ] Daily practice reminders
- [ ] Shareable achievements

### Q2 2026 - Advanced Features
- [ ] Speech-to-text input
- [ ] Text-to-speech AI responses
- [ ] Pronunciation feedback
- [ ] Flashcard generation from vocabulary
- [ ] Spaced repetition system

### Q3 2026 - Community Features
- [ ] Share conversations
- [ ] Leaderboards
- [ ] Language exchange matching
- [ ] Group practice sessions
- [ ] Teacher dashboard

### Monetization Timeline
- **Month 3**: Introduce freemium limits (10 conversations/month)
- **Month 4**: Launch premium tier ($9.99/month)
- **Month 6**: Add pay-per-use option ($0.50/conversation)

---

## Appendix

### User Personas (Quick Reference)

**Emma (College Student)**
- Needs: Quick practice before exams
- Motivation: Pass Spanish class
- Usage: 3-4x/week, short sessions
- Key feature: Beginner-friendly corrections

**David (Business Traveler)**
- Needs: Practical conversation skills
- Motivation: Work trips to France
- Usage: Daily during commute
- Key feature: Scenario-based practice

**Maria (Hobbyist Learner)**
- Needs: Cultural immersion
- Motivation: Anime/Japanese culture
- Usage: Weekends, long sessions
- Key feature: Advanced difficulty, vocabulary tracking

### Competitive Positioning

| Feature | LinguaChat | Duolingo | HelloTalk | ChatGPT |
|---------|-----------|----------|-----------|---------|
| AI Conversations | ✅ | ❌ | ❌ | ✅ |
| Instant Corrections | ✅ | ✅ | ❌ | ❌ |
| Structured Scenarios | ✅ | ✅ | ❌ | ❌ |
| Always Available | ✅ | ✅ | ❌ | ✅ |
| Real-time Streaming | ✅ | ❌ | ✅ | ✅ |
| Vocabulary Tracking | ✅ | ✅ | ❌ | ❌ |
| Free to Use | ✅ (MVP) | Freemium | Free | Freemium |

**Our Competitive Advantage**: The only platform combining AI conversations with structured learning and instant corrections.

---

## Document Control

**Version History**:
- v1.0 (Nov 13, 2025): Initial planning document created
- Next review: End of Sprint 1 (Week 1)

**Sign-off**:
- Product Manager: _________________
- Engineering Lead: _________________
- Design Lead: _________________

**Feedback & Updates**: Submit via GitHub Issues or team Slack channel

---

*This is a living document. Update after each sprint to reflect actual progress and learnings.*
