// Nutrition-related types

export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK'

export interface MealLog {
  id: string
  userId: string
  name: string
  type: MealType
  calories: number
  protein: number | null
  carbs: number | null
  fat: number | null
  source: string | null
  loggedAt: Date
  createdAt: Date
}

export interface HydrationLog {
  id: string
  userId: string
  amount: number
  loggedAt: Date
}

export interface NutritionGoals {
  calorieGoal: number
  proteinGoal: number
  hydrationGoal: number
}

export interface DailyNutritionSummary {
  date: string
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  totalHydration: number
  meals: MealLog[]
}

// Yale Dining types
export interface YaleMenuItem {
  name: string
  station: string
  calories: number | null
  protein: number | null
  carbs: number | null
  fat: number | null
  allergens: string[]
}

export interface YaleMenuResponse {
  date: string
  meal: string
  location: string
  items: YaleMenuItem[]
}

// Form types
export interface CreateMealInput {
  name: string
  type: MealType
  calories: number
  protein?: number
  carbs?: number
  fat?: number
  source?: string
}

export interface CreateHydrationInput {
  amount: number
}
