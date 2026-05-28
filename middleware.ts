import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define marketing/auth pages that logged-in users shouldn't see
  const authRoutes = ['/login', '/register', '/forgot-password'];

  // 2. Handle routing for authentication pages
  if (authRoutes.includes(pathname)) {
    // Check if a frontend authentication marker or token exists
    // (Note: This will only catch cookies visible to the frontend domain)
    const token = request.cookies.get('token')?.value;
    
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // 3. Allow all other requests (including /dashboard) to pass through to the client.
  // The client component layout will securely handle the cross-origin Render cookie check.
  return NextResponse.next();
}

// Strictly define which routes trigger this middleware execution layer
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/login', 
    '/register', 
    '/forgot-password'
  ],
};