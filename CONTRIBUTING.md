# Contributing to LinguaChat

Thank you for your interest in contributing to LinguaChat! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Pull Request Process](#pull-request-process)
5. [Coding Standards](#coding-standards)
6. [Testing Guidelines](#testing-guidelines)
7. [Documentation](#documentation)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow:

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm
- Git
- OpenAI API key

### Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/AI-Language-Learning-App.git
   cd AI-Language-Learning-App
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your OpenAI API key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Verify everything works**
   - Open http://localhost:3000
   - Test the chat functionality
   - Check that corrections and vocabulary work

## Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/your-feature-name` - Feature branches
- `fix/issue-description` - Bug fix branches

### Commit Messages

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Build process or auxiliary tool changes

**Examples:**
```
feat(chat): add voice input support

fix(corrections): resolve duplicate correction entries

docs(readme): update installation instructions
```

### Local Development

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the coding standards below
   - Add comments for complex logic

3. **Test your changes**
   ```bash
   pnpm lint          # Run linter
   pnpm type-check    # Check TypeScript types
   pnpm build         # Verify production build works
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

## Pull Request Process

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex code sections
- [ ] Updated documentation if needed
- [ ] All tests pass locally
- [ ] No new warnings or errors
- [ ] Tested on multiple browsers (Chrome, Firefox, Safari)
- [ ] Tested on mobile devices

### Submission Steps

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Link related issues

3. **Code Review**
   - Wait for maintainer review
   - Address any feedback
   - Make requested changes
   - Request re-review

4. **Merge**
   - Once approved, a maintainer will merge your PR
   - Delete your feature branch after merge

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Document complex types

**Example:**
```typescript
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  corrections?: Correction[];
}
```

### React Components

- Use functional components with hooks
- Prefer named exports over default exports
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript for prop types

**Example:**
```typescript
interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  // Component logic
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow the design system in `app/globals.css`
- Use the `cn()` utility for conditional classes
- Maintain responsive design (mobile-first)
- Support dark mode with dark: prefix

**Example:**
```tsx
<div className={cn(
  "rounded-lg p-4",
  "bg-white dark:bg-slate-900",
  isActive && "ring-2 ring-primary"
)} />
```

### File Organization

```
components/
├── ui/              # shadcn/ui components
├── chat/            # Chat-specific components
├── corrections/     # Corrections panel
└── vocabulary/      # Vocabulary components

lib/
├── utils.ts         # Utility functions
├── store.ts         # Zustand state
└── scenarios.ts     # Scenario definitions
```

### State Management

- Use Zustand for global state
- Use React state for local component state
- Persist important state to localStorage
- Clear sensitive data on logout

### API Routes

- Use Edge runtime when possible
- Implement proper error handling
- Validate all inputs
- Return appropriate status codes
- Add rate limiting for public endpoints

## Testing Guidelines

### Manual Testing Checklist

- [ ] Test all user flows
- [ ] Test with different languages
- [ ] Test with different difficulty levels
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile (iOS and Android)
- [ ] Test dark mode
- [ ] Test with network throttling
- [ ] Test error states
- [ ] Test edge cases

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 15+)
- Chrome Mobile (Android 10+)

## Documentation

### Code Comments

```typescript
/**
 * Sanitizes user input to prevent XSS attacks
 * @param message - The raw message from the user
 * @returns Sanitized message safe for processing
 */
function sanitizeMessage(message: string): string {
  // Remove HTML tags
  const withoutHtml = message.replace(/<[^>]*>/g, "");
  return withoutHtml.trim();
}
```

### Documentation Files

When adding features, update:
- `README.md` - If user-facing
- `USER_GUIDE.md` - For end users
- `TASKS.md` - Mark completed tasks
- `CLAUDE.md` - For AI development context

## Questions?

If you have questions:
- Check existing [Issues](https://github.com/D-Raj-Grg/AI-Language-Learning-App/issues)
- Review [Discussions](https://github.com/D-Raj-Grg/AI-Language-Learning-App/discussions)
- Open a new issue with your question

## Thank You!

Your contributions make LinguaChat better for everyone. We appreciate your time and effort!
