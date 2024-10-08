import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/favicon.ico') {
    return NextResponse.next(); // middleware를 통과하지 않게 함
  }

  const refreshToken = request.cookies.get('refresh')?.value;
  // const accessToken = request.cookies.get('access')?.value;

  // 1. accessToken을 통해서 확인
  // 1-1. accessToken이 없으면 refreshToken있으면 re로 재발급
  // 1-1-1. 발급 다시 받았으면 accessToken으로 다음 작업진행
  // 1-1-2. refreshToken도 만료 되었으면 로그아웃 세션만료 되었다. 다시 로그인 해라라는 에러
  // 1-2. refreshToken도 없으면 걍 로그인해라!

  if (!refreshToken) {
    return NextResponse.redirect(
      new URL('/login?alert=로그인 후 이용 가능한 서비스입니다.', request.url),
    );
  }

  return NextResponse.next();
}

// matcher를 사용하여 지정한 경로에만 middleware 적용
export const config = {
  matcher: ['/mypage/:path*', '/create/:path*'],
};
