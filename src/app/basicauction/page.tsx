import SearchBar from '@/app/basicauction/serachbar';

import * as S from './Basicauction.css';

function Home() {
  return (
    <div className={S.container}>
      <section className={S.section}>
        <div className={S.count}>
          <span>전체</span>
          <span>10</span>
        </div>
        <SearchBar />
        <div>가격</div>
        <div>드롭다운</div>
      </section>
      <section>경매 데이터</section>
    </div>
  );
}

export default Home;
