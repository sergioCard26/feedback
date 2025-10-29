# 🍽️ Feedback App - Restaurant Feedback Platform

Web platform for restaurant customers to submit feedback and generate a public ranking based on customer satisfaction.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **UI**: shadcn/ui + Tailwind CSS v4
- **Validation**: Zod
- **Testing**: Vitest + React Testing Library
- **Format**: Prettier + ESLint

## 📋 Prerequisites

- Node.js 18+
- npm or yarn

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📜 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check formatting
```

## 📁 Project Structure

```text
feedback-app/
├── app/                 # Next.js App Router
│   ├── (admin)/        # Private admin routes
│   ├── (public)/       # Public routes
│   └── api/            # API Routes
├── features/           # Modular features
│   ├── feedback/       # Feedback feature
│   ├── restaurants/    # Restaurants feature
│   └── ranking/        # Ranking feature
├── common/             # Shared code
│   ├── components/     # Reusable UI components
│   ├── services/       # Shared services
│   └── utils/          # Utilities
└── lib/                # Configurations and helpers
```

## 🏗️ Architecture

- **Server Components**: Server-side rendering
- **Server Actions**: Mutations and validations
- **Services**: Business logic
- **Mappers**: Data transformation
- **API Client**: HTTP client for external API

## 🎨 Add shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
```

## 📚 Additional Documentation

See `copilot-instrucctions.md` for detailed development guides and architecture patterns.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
