# Database Schema Documentation

## Overview

Locker v2 uses PostgreSQL with Prisma ORM. The database is designed around the core entity of a User, with related entities for tracking athletic performance, nutrition, academics, and wellness.

## Entity Relationship Diagram

```
User
├── AthleteProfile (1:1)
├── TrainingSession (1:many)
│   └── SessionExercise (1:many)
├── PersonalRecord (1:many)
├── MealLog (1:many)
├── HydrationLog (1:many)
├── CheckIn (1:many)
├── AcademicItem (1:many)
├── MobilityLog (1:many)
└── CoachAthlete (many:many - for coach relationships)
```

## Models

### User
The central entity. Every user has a role (ATHLETE, COACH, or ADMIN).

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| email | String | Unique email address |
| name | String | Display name |
| role | Role enum | ATHLETE, COACH, or ADMIN |
| createdAt | DateTime | Account creation timestamp |
| updatedAt | DateTime | Last update timestamp |

### AthleteProfile
Extended profile information for athletes. Optional for coaches/admins.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| userId | String | Foreign key to User |
| sport | String? | Primary sport |
| position | String? | Playing position |
| team | String? | Team name |
| level | String? | Competition level |
| heightInches | Int? | Height in inches |
| weightLbs | Int? | Weight in pounds |
| calorieGoal | Int | Daily calorie target (default: 2500) |
| proteinGoal | Int | Daily protein target in grams (default: 150) |
| hydrationGoal | Int | Daily hydration target in oz (default: 128) |
| allergies | String[] | List of food allergies |

### TrainingSession
A workout or training session.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| userId | String | Foreign key to User |
| name | String | Session name |
| type | SessionType | PRACTICE, STRENGTH, CARDIO, RECOVERY, GAME |
| intensity | Intensity | LOW, MEDIUM, HIGH |
| status | SessionStatus | PLANNED, IN_PROGRESS, COMPLETED, CANCELLED |
| scheduledAt | DateTime? | When the session is planned |
| startedAt | DateTime? | When the session started |
| completedAt | DateTime? | When the session ended |
| duration | Int? | Duration in minutes |
| notes | String? | Additional notes |

### PersonalRecord
Personal bests for exercises.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| userId | String | Foreign key to User |
| exercise | String | Exercise name |
| weight | Float? | Weight lifted |
| reps | Int? | Number of reps |
| time | Int? | Time in seconds (for timed exercises) |
| distance | Float? | Distance in meters |
| recordedAt | DateTime | When the PR was set |

### MealLog
A logged meal.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| userId | String | Foreign key to User |
| name | String | Meal description |
| type | MealType | BREAKFAST, LUNCH, DINNER, SNACK |
| calories | Int | Total calories |
| protein | Int? | Protein in grams |
| carbs | Int? | Carbohydrates in grams |
| fat | Int? | Fat in grams |
| source | String? | Where the meal came from (e.g., "yale-dining") |
| loggedAt | DateTime | When the meal was consumed |

### HydrationLog
Water intake tracking.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| userId | String | Foreign key to User |
| amount | Int | Amount in ounces |
| loggedAt | DateTime | When water was consumed |

### CheckIn
Daily mental and physical state check-in.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| userId | String | Foreign key to User |
| mentalState | Int | Rating 1-10 |
| physicalState | Int | Rating 1-10 |
| notes | String? | Optional diary entry |
| loggedAt | DateTime | When the check-in occurred |

### AcademicItem
Academic tasks and deadlines.

| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| userId | String | Foreign key to User |
| title | String | Item title |
| type | AcademicType | EXAM, ESSAY, ASSIGNMENT, READING, PROJECT |
| course | String? | Associated course |
| dueAt | DateTime? | Due date |
| completed | Boolean | Completion status |

## Enums

### Role
- `ATHLETE` - Student athlete
- `COACH` - Team coach
- `ADMIN` - System administrator

### SessionType
- `PRACTICE` - Team practice
- `STRENGTH` - Weight training
- `CARDIO` - Cardiovascular training
- `RECOVERY` - Recovery/rehab session
- `GAME` - Competition/game

### Intensity
- `LOW` - Low intensity
- `MEDIUM` - Moderate intensity
- `HIGH` - High intensity

### SessionStatus
- `PLANNED` - Scheduled but not started
- `IN_PROGRESS` - Currently active
- `COMPLETED` - Finished
- `CANCELLED` - Cancelled

### MealType
- `BREAKFAST`
- `LUNCH`
- `DINNER`
- `SNACK`

### AcademicType
- `EXAM`
- `ESSAY`
- `ASSIGNMENT`
- `READING`
- `PROJECT`

## Indexes

Recommended indexes for performance:
- `User.email` - Unique index for login lookup
- `TrainingSession.userId + scheduledAt` - For fetching upcoming sessions
- `MealLog.userId + loggedAt` - For daily meal summary
- `HydrationLog.userId + loggedAt` - For daily hydration total
- `AcademicItem.userId + dueAt` - For upcoming deadlines

## Migrations

When making schema changes:

1. Update `prisma/schema.prisma`
2. Run `pnpm db:migrate dev --name description_of_change`
3. Review the generated migration
4. Test locally before deploying
