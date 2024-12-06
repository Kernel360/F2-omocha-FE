// import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

// const afterLoginProtectedRoutes = ['/login', '/join'];

// TODO 미들웨어 안쓰고 있음
// 페어프로그래밍에서 미들웨어가 하던 역할을 적절하게 수정하는 부분을 진행 할 예정.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('middleware', pathname);

  // if (accessToken && afterLoginProtectedRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // if (!accessToken && afterLoginProtectedRoutes.includes(pathname)) {
  //   return NextResponse.next();
  // }

  // if (!accessToken) {
  //   const response = NextResponse.redirect(
  //     new URL('/login?alert=로그인 후 이용 가능한 서비스입니다.', request.url),
  //   );

  //   return response;
  // }

  return NextResponse.next();
}

// matcher를 사용하여 지정한 경로에만 middleware 적용
export const config = {
  matcher: [],
};

// '/mypage/:path*', '/create/:path*', '/login', '/join'

// 미들웨어에서 토큰이 isExpired인지 확인하는 것을 넣으면 좋겠구먼.. 아니면 interceptor에서든지
