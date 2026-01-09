// Academic-related types

export type AcademicType = 'EXAM' | 'ESSAY' | 'ASSIGNMENT' | 'READING' | 'PROJECT'

export interface AcademicItem {
  id: string
  userId: string
  title: string
  type: AcademicType
  course: string | null
  dueAt: Date | null
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AcademicItemWithPriority extends AcademicItem {
  priority: 'high' | 'medium' | 'low' | 'none'
  isOverdue: boolean
  daysUntilDue: number | null
}

// Form types
export interface CreateAcademicItemInput {
  title: string
  type: AcademicType
  course?: string
  dueAt?: Date
}

export interface UpdateAcademicItemInput {
  title?: string
  type?: AcademicType
  course?: string
  dueAt?: Date
  completed?: boolean
}
