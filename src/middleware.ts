import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/login', '/register', '/api/auth']
const authPaths = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths and static files
  if (
    publicPaths.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    // Check if authenticated user is accessing auth pages
    const sessionCookie = request.cookies.get('better-auth.session_token')
    if (sessionCookie && authPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/training', request.url))
    }
    return NextResponse.next()
  }

  // Check for session cookie on protected routes
  const sessionCookie = request.cookies.get('better-auth.session_token')
  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
