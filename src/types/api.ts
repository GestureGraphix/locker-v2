// API-related types

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T
  error?: never
}

export interface ApiError {
  data?: never
  error: {
    message: string
    code: ErrorCode
    details?: Record<string, unknown>
  }
}

export type ApiResult<T> = ApiResponse<T> | ApiError

// Pagination
export interface PaginatedResponse<T> {
  data: T[]
  nextCursor: string | null
  prevCursor?: string | null
  total?: number
}

export interface PaginationParams {
  cursor?: string
  limit?: number
}

// Error codes
export type ErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR'

// Date range filtering
export interface DateRange {
  from: Date
  to: Date
}

// Sort options
export type SortOrder = 'asc' | 'desc'

export interface SortParams {
  field: string
  order: SortOrder
}
