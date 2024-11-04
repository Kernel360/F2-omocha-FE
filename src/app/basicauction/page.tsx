import { Suspense } from 'react';

import BasicAuction from '@/app/basicauction/basicauction';
import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import LeftSection from '@/app/basicauction/components/leftsection';
import MaxLayout from '@/components/MaxLayout';

import * as S from './Basicauction.css';

function Home() {
  return (
    <MaxLayout>
      <div className={S.basicAuctionContainer}>
        <LeftSection />
        <section className={S.rightSection}>
          <AuctionDropDown />
          <Suspense fallback={<div>loading..^^수정필요해용</div>}>
            <BasicAuction />
          </Suspense>
        </section>
      </div>
    </MaxLayout>
  );
}

export default Home;
