import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieHeader = request.headers.get('cookie') || '';
  const cookiesParsed = parse(cookieHeader);
  const accessToken = cookiesParsed['accessToken'];
  const refreshToken = cookiesParsed['refreshToken'];

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      const sessionResponse = await checkServerSession();
      const setCookieHeader = sessionResponse.headers['set-cookie'] as string | string[] | undefined;

      if (setCookieHeader) {
        const cookieArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];

        if (isPublicRoute) {
          const response = NextResponse.redirect(new URL('/', request.url));
          cookieArray.forEach(c => response.headers.append('set-cookie', c));
          return response;
        }

        if (isPrivateRoute) {
          const response = NextResponse.next();
          cookieArray.forEach(c => response.headers.append('set-cookie', c));
          return response;
        }
      }
    }

    if (isPublicRoute) return NextResponse.next();
    if (isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicRoute) return NextResponse.redirect(new URL('/', request.url));
  if (isPrivateRoute) return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/sign-in', '/sign-up'],
};