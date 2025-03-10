import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/manage']

const unAuthPaths = ['/login']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  if(privatePaths.some((path) => pathname.startsWith(path) && !refreshToken)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(unAuthPaths.some((path) => pathname.startsWith(path) && refreshToken))
    return Response.redirect(new URL('/', request.url))



  //chỉ check xem có acc hay ref_ hay ko chứ ko check có đúng ở server ko 
  if(privatePaths.some((path) => pathname.startsWith(path) && !accessToken && refreshToken)) {
    const url = new URL('/logout', request.url)
    url.searchParams.set('refreshToken', refreshToken as string)
    return Response.redirect(url)
  } 
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/manage/:path*'],
}