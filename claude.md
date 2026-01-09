# Locker v2 - Claude Code Context

## Project Overview

**Locker** is a comprehensive student-athlete performance and wellness management platform designed for university athletes. This is version 2, a complete rebuild focused on improved architecture, scalability, and developer experience.

### What Locker Does
- **Training Management**: Log workouts, track personal records, manage sessions
- **Nutrition Tracking**: Meal logging with Yale Dining integration, hydration tracking, nutrition goals
- **Academic Integration**: Track assignments, exams, essays with due dates and priorities
- **Mobility & Recovery**: Exercise library, recovery logs, rehabilitation tracking
- **Daily Check-ins**: Mental and physical state tracking with diary entries
- **Coach Dashboard**: Multi-athlete oversight, bulk workout assignment, performance monitoring

### User Types
- **Athletes**: Individual students tracking their training, nutrition, academics, and wellness
- **Coaches**: Staff overseeing multiple athletes, assigning workouts, monitoring progress

---

## Goals for v2

### Architecture Goals
1. **Modular State Management**: Replace the 2500+ LOC monolithic context with smaller, focused slices using Zustand
2. **Type Safety**: Full TypeScript strict mode with no `any` or `unknown` types
3. **Server-First**: Move business logic to server actions and API routes
4. **Real-time Sync**: WebSocket or SSE for live updates between athletes and coaches
5. **Testable**: Design for testability from the start

### Feature Goals
1. **Analytics Dashboard**: Charts and trends for performance metrics over time
2. **Push Notifications**: Reminders for workouts, academic deadlines, hydration
3. **Team Collaboration**: Messaging between athletes and coaches
4. **Injury Tracking**: Log injuries and rehabilitation protocols
5. **Data Export**: CSV/PDF export for reports
6. **Offline Support**: True offline-first with background sync

### Technical Debt Prevention
1. Keep components under 300 LOC
2. Write tests alongside features
3. Document all API endpoints
4. Use proper error handling patterns

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5 (strict mode)
- **State Management**: Zustand with persist middleware
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Charts**: Recharts or Chart.js
- **Testing**: Vitest + React Testing Library + Playwright

### Backend
- **Runtime**: Node.js 22
- **ORM**: Prisma 6
- **Database**: PostgreSQL (Neon or Supabase)
- **Auth**: Better Auth or Lucia
- **Real-time**: Server-Sent Events or Pusher

### Infrastructure
- **Deployment**: Vercel
- **Monitoring**: Sentry for errors, Vercel Analytics for performance
- **CI/CD**: GitHub Actions

---

## Folder Structure

```
locker-v2/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth-related pages (login, register)
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/              # Authenticated routes
│   │   │   ├── layout.tsx            # Dashboard layout with nav
│   │   │   ├── page.tsx              # Main dashboard
│   │   │   ├── training/
│   │   │   ├── fuel/
│   │   │   ├── academics/
│   │   │   ├── mobility/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   ├── coach/                    # Coach-specific routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # Coach dashboard
│   │   │   └── athletes/[id]/
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   ├── athletes/
│   │   │   ├── training/
│   │   │   ├── nutrition/
│   │   │   └── webhooks/
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── forms/                    # Reusable form components
│   │   │   ├── meal-form.tsx
│   │   │   ├── session-form.tsx
│   │   │   └── check-in-form.tsx
│   │   ├── dashboard/                # Dashboard-specific components
│   │   │   ├── stats-card.tsx
│   │   │   ├── progress-ring.tsx
│   │   │   └── activity-feed.tsx
│   │   ├── training/                 # Training module components
│   │   ├── nutrition/                # Nutrition module components
│   │   ├── academics/                # Academic module components
│   │   ├── mobility/                 # Mobility module components
│   │   ├── charts/                   # Chart components
│   │   └── shared/                   # Shared components (nav, layout parts)
│   │
│   ├── stores/                       # Zustand stores
│   │   ├── user-store.ts
│   │   ├── training-store.ts
│   │   ├── nutrition-store.ts
│   │   ├── academics-store.ts
│   │   └── ui-store.ts
│   │
│   ├── lib/                          # Utilities and helpers
│   │   ├── db.ts                     # Prisma client
│   │   ├── auth.ts                   # Auth utilities
│   │   ├── validations/              # Zod schemas
│   │   │   ├── user.ts
│   │   │   ├── training.ts
│   │   │   ├── nutrition.ts
│   │   │   └── academics.ts
│   │   ├── utils.ts                  # General utilities
│   │   ├── cn.ts                     # Class name helper
│   │   └── constants.ts              # App constants
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-user.ts
│   │   ├── use-training.ts
│   │   ├── use-nutrition.ts
│   │   └── use-media-query.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── index.ts                  # Barrel export
│   │   ├── user.ts
│   │   ├── training.ts
│   │   ├── nutrition.ts
│   │   └── api.ts
│   │
│   └── server/                       # Server-only code
│       ├── actions/                  # Server actions
│       │   ├── training.ts
│       │   ├── nutrition.ts
│       │   └── auth.ts
│       └── services/                 # Business logic
│           ├── yale-menu.ts
│           └── notifications.ts
│
├── prisma/
│   ├── schema.prisma                 # Database schema
│   ├── migrations/                   # Migration history
│   └── seed.ts                       # Seed data
│
├── tests/
│   ├── unit/                         # Unit tests
│   ├── integration/                  # Integration tests
│   └── e2e/                          # Playwright E2E tests
│
├── docs/                             # Documentation
│   ├── api.md                        # API documentation
│   ├── database.md                   # Database schema docs
│   └── features/                     # Feature specifications
│
├── public/                           # Static assets
│   └── icons/
│
├── .github/
│   └── workflows/
│       └── ci.yml                    # CI/CD pipeline
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── vitest.config.ts
├── playwright.config.ts
└── claude.md                         # This file
```

---

## Code Conventions

### File Naming
- Components: `kebab-case.tsx` (e.g., `stats-card.tsx`)
- Utilities: `kebab-case.ts` (e.g., `date-utils.ts`)
- Types: `kebab-case.ts` (e.g., `user.ts`)
- Tests: `*.test.ts` or `*.spec.ts`

### Component Structure
```tsx
// 1. Imports (external, then internal)
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types (if component-specific)
interface SessionCardProps {
  session: TrainingSession
  onComplete: (id: string) => void
}

// 3. Component
export function SessionCard({ session, onComplete }: SessionCardProps) {
  // hooks first
  const [isLoading, setIsLoading] = useState(false)

  // handlers
  const handleComplete = async () => {
    setIsLoading(true)
    await onComplete(session.id)
    setIsLoading(false)
  }

  // render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  )
}
```

### State Management Pattern (Zustand)
```ts
// stores/training-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TrainingState {
  sessions: TrainingSession[]
  isLoading: boolean
  addSession: (session: TrainingSession) => void
  removeSession: (id: string) => void
  fetchSessions: () => Promise<void>
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      sessions: [],
      isLoading: false,
      addSession: (session) => set((state) => ({
        sessions: [...state.sessions, session]
      })),
      removeSession: (id) => set((state) => ({
        sessions: state.sessions.filter((s) => s.id !== id)
      })),
      fetchSessions: async () => {
        set({ isLoading: true })
        const res = await fetch('/api/training/sessions')
        const sessions = await res.json()
        set({ sessions, isLoading: false })
      },
    }),
    { name: 'training-storage' }
  )
)
```

### Form Pattern (React Hook Form + Zod)
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mealSchema, type MealFormData } from '@/lib/validations/nutrition'

export function MealForm({ onSubmit }: MealFormProps) {
  const form = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: '',
      calories: 0,
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  )
}
```

### API Route Pattern
```ts
// app/api/training/sessions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { sessionSchema } from '@/lib/validations/training'

export async function GET(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessions = await db.trainingSession.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Failed to fetch sessions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = sessionSchema.parse(body)

    const newSession = await db.trainingSession.create({
      data: {
        ...validated,
        userId: session.userId,
      },
    })

    return NextResponse.json(newSession, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 })
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Server Action Pattern
```ts
// server/actions/training.ts
'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { sessionSchema } from '@/lib/validations/training'

export async function createSession(formData: FormData) {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')

  const validated = sessionSchema.parse({
    name: formData.get('name'),
    type: formData.get('type'),
    duration: Number(formData.get('duration')),
  })

  await db.trainingSession.create({
    data: {
      ...validated,
      userId: session.userId,
    },
  })

  revalidatePath('/training')
}
```

---

## Database Schema (Prisma)

Key models to implement:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      Role     @default(ATHLETE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  profile          AthleteProfile?
  trainingSessions TrainingSession[]
  mealLogs         MealLog[]
  hydrationLogs    HydrationLog[]
  checkIns         CheckIn[]
  academics        AcademicItem[]
  mobilityLogs     MobilityLog[]

  // Coach relations
  coachingAthletes CoachAthlete[] @relation("Coach")
  coaches          CoachAthlete[] @relation("Athlete")
}

model AthleteProfile {
  id             String   @id @default(cuid())
  userId         String   @unique
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  sport          String?
  position       String?
  team           String?
  level          String?

  heightInches   Int?
  weightLbs      Int?

  calorieGoal    Int      @default(2500)
  proteinGoal    Int      @default(150)
  hydrationGoal  Int      @default(128)

  allergies      String[]

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model TrainingSession {
  id          String        @id @default(cuid())
  userId      String
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)

  name        String
  type        SessionType
  intensity   Intensity
  status      SessionStatus @default(PLANNED)

  scheduledAt DateTime?
  startedAt   DateTime?
  completedAt DateTime?
  duration    Int?          // minutes

  notes       String?

  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  exercises   SessionExercise[]
}

model PersonalRecord {
  id        String   @id @default(cuid())
  userId    String

  exercise  String
  weight    Float?
  reps      Int?
  time      Int?     // seconds
  distance  Float?   // meters

  recordedAt DateTime @default(now())
}

model MealLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  name      String
  type      MealType
  calories  Int
  protein   Int?
  carbs     Int?
  fat       Int?

  source    String?  // "yale-dining", "manual", etc.

  loggedAt  DateTime @default(now())
  createdAt DateTime @default(now())
}

model HydrationLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  amount    Int      // oz
  loggedAt  DateTime @default(now())
}

model CheckIn {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  mentalState  Int      // 1-10
  physicalState Int     // 1-10
  notes        String?

  loggedAt     DateTime @default(now())
}

model AcademicItem {
  id        String       @id @default(cuid())
  userId    String
  user      User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  title     String
  type      AcademicType
  course    String?
  dueAt     DateTime?
  completed Boolean      @default(false)

  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt
}

// Enums
enum Role {
  ATHLETE
  COACH
  ADMIN
}

enum SessionType {
  PRACTICE
  STRENGTH
  CARDIO
  RECOVERY
  GAME
}

enum Intensity {
  LOW
  MEDIUM
  HIGH
}

enum SessionStatus {
  PLANNED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum MealType {
  BREAKFAST
  LUNCH
  DINNER
  SNACK
}

enum AcademicType {
  EXAM
  ESSAY
  ASSIGNMENT
  READING
  PROJECT
}
```

---

## Key Improvements from v1

### What We're Fixing

| v1 Problem | v2 Solution |
|------------|-------------|
| 2500+ LOC context file | Multiple focused Zustand stores |
| No form validation | React Hook Form + Zod |
| No tests | Vitest + Playwright from day 1 |
| No error handling UI | Toast notifications + error boundaries |
| Manual state sync | Optimistic updates + background sync |
| No pagination | Cursor-based pagination |
| No analytics | Recharts dashboard |
| Local-only auth option | Single auth source (database) |

### Features to Port from v1
- [x] Yale Dining menu integration
- [ ] Daily check-in system
- [ ] Training session management
- [ ] Meal and hydration logging
- [ ] Personal records tracking
- [ ] Academic item tracking
- [ ] Mobility exercise library
- [ ] Coach dashboard with athlete management

### New Features for v2
- [ ] Analytics dashboard with charts
- [ ] Push notifications
- [ ] Team messaging
- [ ] Injury tracking
- [ ] Data export (CSV/PDF)
- [ ] Advanced search
- [ ] Activity feed

---

## Development Workflow

### Getting Started
```bash
# Install dependencies
pnpm install

# Set up database
pnpm db:push

# Seed development data
pnpm db:seed

# Start development server
pnpm dev
```

### Common Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm test         # Run unit tests
pnpm test:e2e     # Run E2E tests
pnpm lint         # Run linter
pnpm db:studio    # Open Prisma Studio
pnpm db:push      # Push schema changes
pnpm db:migrate   # Create migration
```

### Git Workflow
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches

Commit message format:
```
type(scope): description

feat(training): add session completion tracking
fix(nutrition): correct calorie calculation
docs(api): document meal endpoints
```

---

## Context for Claude

When working on this codebase, keep these principles in mind:

1. **Component Size**: If a component exceeds 300 LOC, suggest splitting it
2. **State Location**: Prefer server state; use Zustand only for client-side UI state and caching
3. **Forms**: Always use React Hook Form + Zod for forms
4. **Error Handling**: Every async operation needs proper error handling with user feedback
5. **Types**: No `any` types. Define proper interfaces for everything
6. **Testing**: Write tests for new features. At minimum, add E2E tests for critical paths

### File References
When discussing code, reference files like: `src/components/training/session-card.tsx:45`

### Before Making Changes
1. Read related files to understand context
2. Check for existing patterns in similar features
3. Verify the change won't break existing functionality
4. Consider if tests need updating

### After Making Changes
1. Ensure TypeScript has no errors
2. Run relevant tests
3. Check for console errors/warnings
4. Verify the UI looks correct

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
AUTH_SECRET="..."

# External APIs
YALE_MENU_API_URL="https://yalehospitality.nutrislice.com"

# Feature Flags
ENABLE_NOTIFICATIONS=false
ENABLE_ANALYTICS=true

# Monitoring
SENTRY_DSN="..."
```

---

## API Quick Reference

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out
- `GET /api/auth/session` - Get current session

### Training
- `GET /api/training/sessions` - List sessions
- `POST /api/training/sessions` - Create session
- `PUT /api/training/sessions/:id` - Update session
- `DELETE /api/training/sessions/:id` - Delete session
- `GET /api/training/prs` - List personal records
- `POST /api/training/prs` - Add personal record

### Nutrition
- `GET /api/nutrition/meals` - List meal logs
- `POST /api/nutrition/meals` - Log meal
- `DELETE /api/nutrition/meals/:id` - Delete meal
- `GET /api/nutrition/hydration` - Get hydration logs
- `POST /api/nutrition/hydration` - Log hydration
- `GET /api/nutrition/yale-menu` - Get Yale dining menu

### Academics
- `GET /api/academics` - List academic items
- `POST /api/academics` - Create item
- `PUT /api/academics/:id` - Update item
- `DELETE /api/academics/:id` - Delete item

### User
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/settings` - Get settings
- `PUT /api/user/settings` - Update settings

---

## Notes

- This project uses pnpm as the package manager
- The database is PostgreSQL, hosted on Neon/Supabase
- Deployment is on Vercel with automatic preview deploys
- The Yale Dining integration requires proper caching to avoid rate limits
