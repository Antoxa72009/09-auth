import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute =
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname === '/';

  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  // Якщо користувач неавторизований і намагається отримати доступ до приватної сторінки,
  // перенаправляємо його на сторінку входу.
  if (!accessToken && isPrivateRoute) {
    if (refreshToken) {
      const url = new URL('/api/auth/refresh', request.url);
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Якщо користувач авторизований і намагається отримати доступ до публічної сторінки,
  // перенаправляємо його на сторінку профілю.
  if (accessToken && isPublicRoute && pathname !== '/') {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};