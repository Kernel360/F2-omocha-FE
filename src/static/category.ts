export interface SubCategory {
  id: number;
  name: string;
  isLoginRequireToShow: string; // 'ALL' | 'LOGIN_REQUIRE' | 'NO_LOGIN_REQUIRE';
  path?: string;
}

export const SUB_CATEGORY = [
  { id: 1, name: '경매 등록', path: '/create' },
  { id: 2, name: '마이페이지', path: '/mypage/profile' },
  { id: 3, name: '찜', path: '/mypage/heart' },
  { id: 4, name: '알림' },
  { id: 5, name: '로그인', path: '/login' },
];

export const MAIN_CATEGORY = [
  { id: 1, name: 'Home', path: '/' },
  { id: 2, name: 'Normal', path: '/basicauction' },
  { id: 4, name: 'How To', path: '/howto' },
];

export const MYPAGE_CATEGORY = [
  { id: 1, name: '회원 정보 수정', path: '/mypage/profile' },
  { id: 2, name: '찜', path: '/mypage/heart' },
  { id: 3, name: '키워드', path: '/mypage/keyword' },
  { id: 4, name: '거래 내역', path: '/mypage/record' },
];
