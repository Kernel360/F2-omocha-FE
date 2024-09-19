import * as S from '@/components/MainHeader/MainHeader.css';

function MainHeader() {
  return (
    <div className={S.container}>
      <section className={S.topHeader}>
        <h1>LOGO</h1>
        <div className={S.topCategory}>
          <span>게시물 업로드</span>
          <span>마이페이지</span>
          <span>찜</span>
          {/* <span>알림</span> */}
          <span>로그인</span>
        </div>
      </section>
      <section className={S.bottomHeader}>
        <span>Home</span>
        <span>Normal</span>
        {/* <span>Live</span> */}
        <span>How To</span>
      </section>
    </div>
  );
}

export default MainHeader;
