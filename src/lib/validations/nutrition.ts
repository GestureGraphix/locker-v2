import { z } from 'zod'

// Meal type enum
export const mealTypeSchema = z.enum(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'])

// Create meal schema
export const createMealSchema = z.object({
  name: z.string().min(1, 'Meal name is required').max(200),
  type: mealTypeSchema,
  calories: z.number().min(0, 'Calories must be positive').max(10000),
  protein: z.number().min(0).max(1000).optional(),
  carbs: z.number().min(0).max(1000).optional(),
  fat: z.number().min(0).max(1000).optional(),
  source: z.string().max(50).optional(),
})

export type CreateMealFormData = z.infer<typeof createMealSchema>

// Update meal schema
export const updateMealSchema = createMealSchema.partial()

export type UpdateMealFormData = z.infer<typeof updateMealSchema>

// Hydration log schema
export const createHydrationSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least 1 oz').max(128, 'Amount seems too high'),
})

export type CreateHydrationFormData = z.infer<typeof createHydrationSchema>

// Nutrition goals schema
export const nutritionGoalsSchema = z.object({
  calorieGoal: z.number().min(500).max(10000),
  proteinGoal: z.number().min(0).max(500),
  hydrationGoal: z.number().min(32).max(256),
})

export type NutritionGoalsFormData = z.infer<typeof nutritionGoalsSchema>

// Query params for listing meals
export const listMealsQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  type: mealTypeSchema.optional(),
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
})

export type ListMealsQuery = z.infer<typeof listMealsQuerySchema>

// Query params for hydration
export const listHydrationQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
})

export type ListHydrationQuery = z.infer<typeof listHydrationQuerySchema>

// Yale menu query
export const yaleMenuQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  meal: z.enum(['breakfast', 'lunch', 'dinner']),
  location: z.string().optional(),
})

export type YaleMenuQuery = z.infer<typeof yaleMenuQuerySchema>
