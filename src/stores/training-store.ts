import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TrainingSession, PersonalRecord, CreateSessionInput, UpdateSessionInput } from '@/types'

interface TrainingState {
  // Data
  sessions: TrainingSession[]
  personalRecords: PersonalRecord[]

  // Loading states
  isLoadingSessions: boolean
  isLoadingPRs: boolean

  // Error state
  error: string | null

  // Actions
  setSessions: (sessions: TrainingSession[]) => void
  addSession: (session: TrainingSession) => void
  updateSession: (id: string, updates: Partial<TrainingSession>) => void
  removeSession: (id: string) => void

  setPersonalRecords: (prs: PersonalRecord[]) => void
  addPersonalRecord: (pr: PersonalRecord) => void

  // Async actions
  fetchSessions: () => Promise<void>
  createSession: (input: CreateSessionInput) => Promise<TrainingSession | null>
  updateSessionOnServer: (id: string, input: UpdateSessionInput) => Promise<void>
  deleteSession: (id: string) => Promise<void>

  fetchPersonalRecords: () => Promise<void>

  // Utility
  clearError: () => void
  reset: () => void
}

const initialState = {
  sessions: [],
  personalRecords: [],
  isLoadingSessions: false,
  isLoadingPRs: false,
  error: null,
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Synchronous actions
      setSessions: (sessions) => set({ sessions }),

      addSession: (session) =>
        set((state) => ({
          sessions: [session, ...state.sessions],
        })),

      updateSession: (id, updates) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s
          ),
        })),

      removeSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
        })),

      setPersonalRecords: (personalRecords) => set({ personalRecords }),

      addPersonalRecord: (pr) =>
        set((state) => ({
          personalRecords: [pr, ...state.personalRecords],
        })),

      // Async actions
      fetchSessions: async () => {
        set({ isLoadingSessions: true, error: null })
        try {
          const res = await fetch('/api/training/sessions')
          if (!res.ok) throw new Error('Failed to fetch sessions')
          const data = await res.json()
          set({ sessions: data.data, isLoadingSessions: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch sessions',
            isLoadingSessions: false,
          })
        }
      },

      createSession: async (input) => {
        set({ error: null })
        try {
          const res = await fetch('/api/training/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
          })
          if (!res.ok) throw new Error('Failed to create session')
          const session = await res.json()
          get().addSession(session)
          return session
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create session',
          })
          return null
        }
      },

      updateSessionOnServer: async (id, input) => {
        // Optimistic update
        const previousSessions = get().sessions
        get().updateSession(id, input as Partial<TrainingSession>)

        try {
          const res = await fetch(`/api/training/sessions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
          })
          if (!res.ok) throw new Error('Failed to update session')
        } catch (error) {
          // Rollback on failure
          set({
            sessions: previousSessions,
            error: error instanceof Error ? error.message : 'Failed to update session',
          })
        }
      },

      deleteSession: async (id) => {
        // Optimistic delete
        const previousSessions = get().sessions
        get().removeSession(id)

        try {
          const res = await fetch(`/api/training/sessions/${id}`, {
            method: 'DELETE',
          })
          if (!res.ok) throw new Error('Failed to delete session')
        } catch (error) {
          // Rollback on failure
          set({
            sessions: previousSessions,
            error: error instanceof Error ? error.message : 'Failed to delete session',
          })
        }
      },

      fetchPersonalRecords: async () => {
        set({ isLoadingPRs: true, error: null })
        try {
          const res = await fetch('/api/training/prs')
          if (!res.ok) throw new Error('Failed to fetch PRs')
          const data = await res.json()
          set({ personalRecords: data.data, isLoadingPRs: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch PRs',
            isLoadingPRs: false,
          })
        }
      },

      // Utility
      clearError: () => set({ error: null }),

      reset: () => set(initialState),
    }),
    {
      name: 'locker-training',
      partialize: (state) => ({
        sessions: state.sessions,
        personalRecords: state.personalRecords,
      }),
    }
  )
)

// Selectors
export const selectUpcomingSessions = (state: TrainingState) =>
  state.sessions
    .filter((s) => s.status === 'PLANNED' && s.scheduledAt && new Date(s.scheduledAt) > new Date())
    .sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime())

export const selectTodaysSessions = (state: TrainingState) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return state.sessions.filter((s) => {
    if (!s.scheduledAt) return false
    const scheduled = new Date(s.scheduledAt)
    return scheduled >= today && scheduled < tomorrow
  })
}

export const selectCompletedSessions = (state: TrainingState) =>
  state.sessions.filter((s) => s.status === 'COMPLETED')

export const selectPRsByExercise = (state: TrainingState, exercise: string) =>
  state.personalRecords
    .filter((pr) => pr.exercise.toLowerCase() === exercise.toLowerCase())
    .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime())
