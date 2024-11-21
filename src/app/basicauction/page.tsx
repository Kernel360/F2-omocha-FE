import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import BasicAuction from '@/app/basicauction/basicauction';
import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import Checkbox from '@/app/basicauction/components/checkbox';
import AuctionCategoryLeftSection from '@/components/LeftSection/components/AuctionCategoryLeftSection/AuctionCategoryLeftSection';
import MaxLayout from '@/components/MaxLayout';

import * as S from './Basicauction.css';

function Home({ searchParams }: { searchParams: GetBasicAuctionListParams }) {
  return (
    <MaxLayout>
      <div className={S.basicAuctionContainer}>
        <AuctionCategoryLeftSection />
        <section className={S.rightSection}>
          <div className={S.topInfoSection}>
            <Checkbox />
            <AuctionDropDown />
          </div>
          <BasicAuction searchParams={searchParams} />
        </section>
      </div>
    </MaxLayout>
  );
}

export default Home;
