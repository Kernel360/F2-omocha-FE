import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const afterLoginProtectedRoutes = ['/login', '/join'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('middleware', pathname);
  const accessToken = cookies().get('accessToken')?.value;

  if (accessToken && afterLoginProtectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!accessToken && afterLoginProtectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const response = NextResponse.redirect(
      new URL('/login?alert=로그인 후 이용 가능한 서비스입니다.', request.url),
    );

    return response;
  }

  return NextResponse.next();
}

// matcher를 사용하여 지정한 경로에만 middleware 적용
export const config = {
  matcher: ['/mypage/:path*', '/create/:path*', '/login', '/join'],
};
