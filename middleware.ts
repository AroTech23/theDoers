import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Read auth session cookie
  const authRole = request.cookies.get('thedoers_auth_role')?.value

  // 1. Protecting Admin Routes
  if (pathname.startsWith('/admin')) {
    if (authRole !== 'admin') {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 2. Protecting Doer Dashboard Routes
  if (pathname.startsWith('/dashboard')) {
    if (authRole !== 'doer' && authRole !== 'admin') {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Allow visiting /login and /register freely so users can switch accounts or log in as different roles
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
  ],
}
