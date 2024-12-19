/**
 * login_type : 'general' / 'naver' / 'google'
 * prev_event: '경매 등록' / '마이페이지' / '찜' / '거래 내역' / 'QnA쓰기' / '입찰기록보기'
 * page_context: 'main_page' / 'auction_list-page' / 'heart_page' / 'record_page'
 * banner_name: '배너1' / '설문지' / '배너2'
 */

const EVENT_ID = {
  // 회원가입
  JOIN_BUTTON_CLICKED: 'join_button_clicked',
  JOIN_PAGE_VIEWED: 'join_page_viewed',
  JOIN_SUBMIT_BUTTON_CLICKED: 'join_submit_button_clicked',

  // 로그인
  LOGIN_BUTTON_CLICKED: 'login_button_clicked',
  LOGIN_PAGE_VIEWED: 'login_page_viewed',
  LOGIN_SUBMIT_BUTTON_CLICKED: 'login_submit_button_clicked', // { email, login_type }
  // LOGIN_WITH_NAVER_BUTTON_CLICKED: 'login_with_naver_button_clicked',
  // LOGIN_WITH_GOOGLE_BUTTON_CLICKED: 'login_with_google_button_clicked',
  REDIRECT_TO_LOGIN_PAGE_VIEWED: 'redirect_to_login_page_viewed', // { prev_event }

  // 로그아웃
  LOGOUT_BUTTON_CLICKED: 'logout_button_clicked', // reset()

  // 알림
  ALARM_BUTTON_CLICKED: 'alarm_button_clicked',

  // 카테고리
  CATEGORY_BUTTON_CLICKED: 'category_button_clicked', // { category_name }

  // 경매 리스트/상세 페이지
  AUCTION_LIST_PAGE_VIEWED: 'auction_list_page_viewed',
  AUCTION_DETAIL_ITEM_CLICKED: 'auction_detail_item_clicked', // { context_page, category_id, now_price, is_expired }
  AUCTION_DETAIL_PAGE_VIEWED: 'auction_detail_page_viewed',
  AUCTION_DETAIL_INSTANT_BUY_BUTTON_CLICKED: 'auction_detail_instant_buy_button_clicked',
  AUCTION_DETAIL_BID_BUTTON_CLICKED: 'auction_detail_bid_button_clicked',
  AUCTION_DETAIL_HEART_BUTTON_CLICKED: 'auction_detail_heart_button_clicked', // { is_login }

  // 메인페이지
  DAILY_POPULAR_AUCTION_ITEM_CLICKED: 'daily_popular_auction_item_clicked', // { item_rank }
  VIEW_ALL_NEW_AUCTION_LIST_BUTTON_CLICKED: 'view_all_new_auction_list_button_clicked',
  VIEW_ALL_CLOSING_SOON_AUCTION_LIST_BUTTON_CLICKED:
    'view_all_closing_soon_auction_list_button_clicked',
  CAROUSEL_BANNER_BUTTON_CLICKED: 'carousel_banner_button_clicked', // { banner_name }
  MAIN_BUTTON_CLICKED: 'main_button_clicked',
  MAIN_PAGE_VIEWED: 'main_page_viewed',

  // 상품 올리기
  AUCTION_CREATE_BUTTON_CLICKED: 'auction_create_button_clicked',
  AUCTION_CREATE_PAGE_VIEWED: 'auction_create_page_viewed',
  AUCTION_CREATE_SUBMIT_BUTTON_CLICKED: 'auction_create_submit_button_clicked', // { is_instant_buy }
  // AUCTION_CREATE_INSTANT_PRICE_BUTTON_CLICKED: 'auction_create_instant_price_button_clicked',
  // AUCTION_CREATE_INSTANCE_PRICE_SUBMIT_BUTTON_CLICKED:
  // 'auction_create_instance_price_submit_button_clicked',
  // AUCTION_CREATE_SUBMIT_RESULT: 'auction_create_submit_result',
  // AUCTION_CREATE_SUBMIT_FAILURE_REASON: 'auction_create_submit_failure_reason',

  // 마이페이지
  MYPAGE_PROFILE_BUTTON_CLICKED: 'mypage_profile_button_clicked',
  MYPAGE_PROFILE_PAGE_VIEWED: 'mypage_profile_page_viewed',
  MYPAGE_HEART_BUTTON_CLICKED: 'mypage_heart_button_clicked',
  MYPAGE_HEART_PAGE_VIEWED: 'mypage_heart_page_viewed',
  MYPAGE_RECORD_BUTTON_CLICKED: 'mypage_record_button_clicked',
  MYPAGE_RECORD_PAGE_VIEWED: 'mypage_record_page_viewed',
};

export default EVENT_ID;
