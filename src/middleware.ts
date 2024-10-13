import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const afterLoginProtectedRoutes = ['/login', '/join'];

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh')?.value;
  const accessToken = request.cookies.get('access')?.value;

  const { pathname } = request.nextUrl;

  if (refreshToken && afterLoginProtectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (afterLoginProtectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if ((!refreshToken && !accessToken) || (!refreshToken && accessToken)) {
    const response = NextResponse.redirect(
      new URL('/login?alert=로그인 후 이용 가능한 서비스입니다.', request.url),
    );

    // refreshToken이 없고 accessToken이 있는 경우에만 동작하도록 조정
    if (!refreshToken && accessToken) {
      response.cookies.delete('access'); // 여기서 accessToken 삭제
    }

    return response;
  }

  return NextResponse.next();
}

// matcher를 사용하여 지정한 경로에만 middleware 적용
export const config = {
  matcher: ['/mypage/:path*', '/create/:path*', '/login', '/join'],
};
