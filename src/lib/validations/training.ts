import { z } from 'zod'

// Session types enum
export const sessionTypeSchema = z.enum(['PRACTICE', 'STRENGTH', 'CARDIO', 'RECOVERY', 'GAME'])

// Intensity enum
export const intensitySchema = z.enum(['LOW', 'MEDIUM', 'HIGH'])

// Session status enum
export const sessionStatusSchema = z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])

// Create session schema
export const createSessionSchema = z.object({
  name: z.string().min(1, 'Session name is required').max(100),
  type: sessionTypeSchema,
  intensity: intensitySchema,
  scheduledAt: z.coerce.date().optional(),
  notes: z.string().max(1000).optional(),
})

export type CreateSessionFormData = z.infer<typeof createSessionSchema>

// Update session schema
export const updateSessionSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  type: sessionTypeSchema.optional(),
  intensity: intensitySchema.optional(),
  status: sessionStatusSchema.optional(),
  scheduledAt: z.coerce.date().optional().nullable(),
  startedAt: z.coerce.date().optional().nullable(),
  completedAt: z.coerce.date().optional().nullable(),
  duration: z.number().min(1).max(600).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
})

export type UpdateSessionFormData = z.infer<typeof updateSessionSchema>

// Session exercise schema
export const sessionExerciseSchema = z.object({
  name: z.string().min(1, 'Exercise name is required').max(100),
  sets: z.number().min(1).max(100).optional(),
  reps: z.number().min(1).max(1000).optional(),
  weight: z.number().min(0).max(2000).optional(),
  notes: z.string().max(500).optional(),
})

export type SessionExerciseFormData = z.infer<typeof sessionExerciseSchema>

// Personal record schema
export const createPRSchema = z
  .object({
    exercise: z.string().min(1, 'Exercise name is required').max(100),
    weight: z.number().min(0).max(2000).optional(),
    reps: z.number().min(1).max(1000).optional(),
    time: z.number().min(1).max(86400).optional(), // max 24 hours in seconds
    distance: z.number().min(0).max(100000).optional(), // max 100km in meters
    notes: z.string().max(500).optional(),
  })
  .refine((data) => data.weight || data.reps || data.time || data.distance, {
    message: 'At least one measurement (weight, reps, time, or distance) is required',
  })

export type CreatePRFormData = z.infer<typeof createPRSchema>

// Query params schema for listing sessions
export const listSessionsQuerySchema = z.object({
  status: sessionStatusSchema.optional(),
  type: sessionTypeSchema.optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
})

export type ListSessionsQuery = z.infer<typeof listSessionsQuerySchema>
