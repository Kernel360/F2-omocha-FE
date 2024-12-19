import EVENT_ID from './eventId';

export const SUB_CATEGORY = [
  { id: 1, name: '경매 등록', path: '/create', eventId: EVENT_ID.AUCTION_CREATE_BUTTON_CLICKED },
  {
    id: 2,
    name: '마이페이지',
    path: '/mypage/profile',
    eventId: EVENT_ID.MYPAGE_PROFILE_BUTTON_CLICKED,
  },
  { id: 3, name: '찜', path: '/mypage/heart', eventId: EVENT_ID.MYPAGE_HEART_BUTTON_CLICKED },
  { id: 4, name: '알림', eventId: EVENT_ID.ALARM_BUTTON_CLICKED },
];

export const MAIN_CATEGORY = [
  { id: 1, name: 'Home', path: '/', eventId: EVENT_ID.MAIN_BUTTON_CLICKED },
  {
    id: 2,
    name: 'Auction',
    path: '/basicauction?page=1',
    eventId: EVENT_ID.CATEGORY_BUTTON_CLICKED,
  },
  { id: 3, name: 'Upload', path: '/create', eventId: EVENT_ID.AUCTION_CREATE_BUTTON_CLICKED },
  {
    id: 4,
    name: 'MyPage',
    path: '/mypage/profile',
    eventId: EVENT_ID.MYPAGE_PROFILE_BUTTON_CLICKED,
  },
  { id: 5, name: 'Heart', path: '/mypage/heart', eventId: EVENT_ID.MYPAGE_HEART_BUTTON_CLICKED },
];

export const MYPAGE_CATEGORY = [
  {
    id: 1,
    name: '회원 정보 수정',
    path: '/mypage/profile',
    eventId: EVENT_ID.MYPAGE_PROFILE_BUTTON_CLICKED,
  },
  {
    id: 2,
    name: '찜',
    path: '/mypage/heart',
    eventId: EVENT_ID.MYPAGE_HEART_BUTTON_CLICKED,
  },
  {
    id: 3,
    name: '거래 내역',
    path: '/mypage/record',
    eventId: EVENT_ID.MYPAGE_RECORD_BUTTON_CLICKED,
  },
];
