import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const isPublicPath = pathname === '/' || pathname === '/login';

  if (isPublicPath && refreshToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isPublicPath && !refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  /**
   * 아래 경로를 제외한 모든 요청 경로에 매칭:
   * 1. api (BFF API Route)
   * 2. _next/static (정적 파일)
   * 3. _next/image (이미지 최적화 파일)
   * 4. favicon.ico, manifest.webmanifest (루트 정적 파일)
   * 5. .png, .svg 등 이미지 확장자
   */
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.ts|mockServiceWorker.js|firebase-messaging-sw\\.js|.*\\.png$|.*\\.svg$).*)',
  ],
};
