import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// All paths that require Administrator privileges
const ADMIN_PATHS = ['/admin', '/admin/students', '/admin/projects']

// All paths that require Student/Doer privileges
const DOER_PATHS = ['/dashboard', '/dashboard/projects', '/dashboard/profile', '/dashboard/settings']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Read auth session cookie
  const authRole = request.cookies.get('thedoers_auth_role')?.value

  // 1. Protecting Admin Routes
  if (pathname.startsWith('/admin')) {
    if (authRole !== 'admin') {
      // Not authenticated as Admin -> redirect securely to login with return URL
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 2. Protecting Doer Dashboard Routes
  if (pathname.startsWith('/dashboard')) {
    if (authRole !== 'doer' && authRole !== 'admin') {
      // Not logged in -> redirect to login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 3. Prevent logged-in users from seeing /login or /register again
  if ((pathname === '/login' || pathname === '/register') && authRole) {
    if (authRole === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    if (authRole === 'doer') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
}
