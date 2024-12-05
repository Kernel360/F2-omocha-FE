const EVENT_ID = {
  // 회원가입
  JOIN_BUTTON_CLICKED: 'join_button_clicked',
  JOIN_PAGE_VIEWED: 'join_page_viewed',
  JOIN_SUBMIT_BUTTON_CLICKED: 'join_submit_button_clicked',

  // 로그인
  LOGIN_BUTTON_CLICKED: 'login_button_clicked',
  LOGIN_PAGE_VIEWED: 'login_page_viewed',
  LOGIN_SUBMIT_BUTTON_CLICKED: 'login_submit_button_clicked',
  LOGIN_WITH_NAVER_BUTTON_CLICKED: 'login_with_naver_button_clicked',
  LOGIN_WITH_GOOGLE_BUTTON_CLICKED: 'login_with_google_button_clicked',
  REDIRECT_TO_LOGIN_PAGE_VIEWED: 'redirect_to_login_page_viewed',

  // 로그아웃
  LOGOUT_BUTTON_CLICKED: 'logout_button_clicked',

  // 메인페이지
  DAILY_POPULAR_AUCTION_ELEMENT_CLICKED: 'daily_popular_auction_element_clicked',
  NEW_AUCTION_ITEM_ELEMENT_CLICKED: 'new_auction_item_element_clicked',
  VIEW_ALL_NEW_AUCTION_ITEMS_BUTTON_CLICKED: 'view_all_new_auction_items_button_clicked',
  CLOSING_SOON_AUCTION_ELEMENT_CLICKED: 'closing_soon_auction_element_clicked',
  VIEW_ALL_CLOSING_SOON_AUCTION_ITEMS_BUTTON_CLICKED:
    'view_all_closing_soon_auction_items_button_clicked',
  CAROUSEL_BANNER_CLICKED: 'carousel_banner_clicked',

  // 상품 올리기
  AUCTION_CREATE_BUTTON_CLICKED: 'auction_create_button_clicked',
  AUCTION_CREATE_PAGE_VIEWED: 'auction_create_page_viewed',
  AUCTION_CREATE_SUBMIT_BUTTON_CLICKED: 'auction_create_submit_button_clicked',
  AUCTION_CREATE_INSTANT_PRICE_BUTTON_CLICKED: 'auction_create_instant_price_button_clicked',
  AUCTION_CREATE_INSTANCE_PRICE_SUBMIT_BUTTON_CLICKED:
    'auction_create_instance_price_submit_button_clicked',
  AUCTION_CREATE_SUBMIT_RESULT: 'auction_create_submit_result',
  AUCTION_CREATE_SUBMIT_FAILURE_REASON: 'auction_create_submit_failure_reason',

  // 마이페이지
  MY_PAGE_BUTTON_CLICKED: 'my_page_button_clicked',
  MY_PAGE_VIEWED: 'my_page_viewed',
  MY_PAGE_HEART_BUTTON_CLICKED: 'my_page_heart_button_clicked',
  MY_PAGE_HEART_VIEWED: 'my_page_heart_viewed',
  MY_PAGE_RECORD_BUTTON_CLICKED: 'my_page_record_button_clicked',
  MY_PAGE_RECORD_VIEWED: 'my_page_record_viewed',
};

export default EVENT_ID;
