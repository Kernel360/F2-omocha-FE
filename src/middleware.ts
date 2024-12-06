import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const afterLoginProtectedRoutes = ['/login', '/join'];

// 리프레쉬 토큰으로 엑세스 및 리프레시 재발급
const getRefreshToken = (refreshTokenParams: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/auth/token-reissue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshTokenParams }),
  });
};

export function middleware(request: NextRequest) {
  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;

  // const accessToken = sessionStorage.getItem('accessToken');
  console.log('accessToken ==========in middleWare===============================', accessToken);

  const { pathname } = request.nextUrl;

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
  matcher: [],
};

//'/mypage/:path*', '/create/:path*', '/login', '/join'

// 미들웨어에서 토큰이 isExpired인지 확인하는 것을 넣으면 좋겠구먼.. 아니면 interceptor에서든지
