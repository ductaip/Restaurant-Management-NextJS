import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/manage']

const unAuthPaths = ['/login']
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl
  console.log('>>>',pathname)
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/manage/:path*'],
}