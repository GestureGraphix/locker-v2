// User-related types

export type Role = 'ATHLETE' | 'COACH' | 'ADMIN'

export interface User {
  id: string
  email: string
  emailVerified: boolean
  name: string
  image: string | null
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface AthleteProfile {
  id: string
  userId: string
  sport: string | null
  position: string | null
  team: string | null
  level: string | null
  heightInches: number | null
  weightLbs: number | null
  calorieGoal: number
  proteinGoal: number
  hydrationGoal: number
  allergies: string[]
}

export interface UserWithProfile extends User {
  profile: AthleteProfile | null
}

export interface SessionUser {
  id: string
  email: string
  name: string
  role: Role
}
