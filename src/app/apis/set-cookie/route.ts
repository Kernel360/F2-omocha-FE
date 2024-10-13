import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh')?.value;
  const accessToken = request.cookies.get('access')?.value;

  if (!refreshToken) {
    const response = NextResponse.json({ message: '리프래시 토큰이 없습니다.' }, { status: 401 });
    if (accessToken) {
      response.cookies.delete('access');
    }

    return response;
  }

  return NextResponse.json({ refreshToken });
}
