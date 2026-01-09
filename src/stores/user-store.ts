import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Role, SessionUser } from '@/types'
import { authClient } from '@/lib/auth-client'

// Extended user type to include custom role field
type AuthUser = {
  id: string
  email: string
  name: string
  role?: string
}

interface UserState {
  // Data
  user: SessionUser | null
  isAuthenticated: boolean

  // Loading states
  isLoading: boolean
  isInitialized: boolean

  // Error state
  error: string | null

  // Actions
  setUser: (user: SessionUser | null) => void

  // Async actions
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, role?: Role) => Promise<boolean>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>

  // Utility
  clearError: () => void
  reset: () => void
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isInitialized: true,
        }),

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const result = await authClient.signIn.email({
            email,
            password,
          })
          if (result.error) {
            throw new Error(result.error.message || 'Login failed')
          }
          const session = await authClient.getSession()
          if (session.data?.user) {
            const user = session.data.user as AuthUser
            set({
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: (user.role as Role) || 'ATHLETE',
              },
              isAuthenticated: true,
              isLoading: false,
            })
            return true
          }
          throw new Error('Failed to get session')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          })
          return false
        }
      },

      register: async (name, email, password, role = 'ATHLETE') => {
        set({ isLoading: true, error: null })
        try {
          const result = await authClient.signUp.email({
            name,
            email,
            password,
          } as Parameters<typeof authClient.signUp.email>[0])
          if (result.error) {
            throw new Error(result.error.message || 'Registration failed')
          }
          // Auto-login after registration
          return get().login(email, password)
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          })
          return false
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await authClient.signOut()
          set({ ...initialState, isInitialized: true })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Logout failed',
            isLoading: false,
          })
        }
      },

      refreshSession: async () => {
        set({ isLoading: true })
        try {
          const session = await authClient.getSession()
          if (session.data?.user) {
            const user = session.data.user as AuthUser
            set({
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: (user.role as Role) || 'ATHLETE',
              },
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true,
            })
          } else {
            set({ ...initialState, isInitialized: true })
          }
        } catch {
          set({ ...initialState, isInitialized: true })
        }
      },

      clearError: () => set({ error: null }),

      reset: () => set(initialState),
    }),
    {
      name: 'locker-user',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Selectors
export const selectIsAdmin = (state: UserState) => state.user?.role === 'ADMIN'
export const selectIsCoach = (state: UserState) =>
  state.user?.role === 'COACH' || state.user?.role === 'ADMIN'
export const selectIsAthlete = (state: UserState) => state.user?.role === 'ATHLETE'
