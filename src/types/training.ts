// Training-related types

export type SessionType = 'PRACTICE' | 'STRENGTH' | 'CARDIO' | 'RECOVERY' | 'GAME'
export type Intensity = 'LOW' | 'MEDIUM' | 'HIGH'
export type SessionStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface TrainingSession {
  id: string
  userId: string
  name: string
  type: SessionType
  intensity: Intensity
  status: SessionStatus
  scheduledAt: Date | null
  startedAt: Date | null
  completedAt: Date | null
  duration: number | null
  notes: string | null
  createdAt: Date
  updatedAt: Date
}

export interface SessionExercise {
  id: string
  sessionId: string
  name: string
  sets: number | null
  reps: number | null
  weight: number | null
  notes: string | null
  order: number
}

export interface TrainingSessionWithExercises extends TrainingSession {
  exercises: SessionExercise[]
}

export interface PersonalRecord {
  id: string
  userId: string
  exercise: string
  weight: number | null
  reps: number | null
  time: number | null
  distance: number | null
  notes: string | null
  recordedAt: Date
}

// Form types
export interface CreateSessionInput {
  name: string
  type: SessionType
  intensity: Intensity
  scheduledAt?: Date
  notes?: string
}

export interface UpdateSessionInput {
  name?: string
  type?: SessionType
  intensity?: Intensity
  status?: SessionStatus
  scheduledAt?: Date
  startedAt?: Date
  completedAt?: Date
  duration?: number
  notes?: string
}

export interface CreatePRInput {
  exercise: string
  weight?: number
  reps?: number
  time?: number
  distance?: number
  notes?: string
}
