import { auth } from './auth'
import { headers } from 'next/headers'
import { cache } from 'react'

/**
 * Get the current session (cached for the request)
 * Use in server components and server actions
 */
export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
})

/**
 * Get the current user from session
 * Returns null if not authenticated
 */
export const getCurrentUser = cache(async () => {
  const session = await getSession()
  return session?.user ?? null
})

/**
 * Check if user has one of the specified roles
 */
export const hasRole = async (roles: string[]) => {
  const user = await getCurrentUser()
  return user ? roles.includes(user.role as string) : false
}

/**
 * Require authentication - throws if not authenticated
 * Use at the start of protected server actions/routes
 */
export const requireAuth = async () => {
  const session = await getSession()
  if (!session) {
    throw new Error('UNAUTHORIZED')
  }
  return session
}

/**
 * Require specific role(s) - throws if not authorized
 */
export const requireRole = async (roles: string[]) => {
  const session = await requireAuth()
  if (!roles.includes(session.user.role as string)) {
    throw new Error('FORBIDDEN')
  }
  return session
}
