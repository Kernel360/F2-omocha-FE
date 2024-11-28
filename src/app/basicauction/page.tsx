import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import BasicAuction from '@/app/basicauction/basicauction';
import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import Checkbox from '@/app/basicauction/components/checkbox';
import BreadcrumbSection from '@/components/BreadcrumbSection';
import AuctionCategoryLeftSection from '@/components/LeftSection/components/AuctionCategoryLeftSection/AuctionCategoryLeftSection';
import MobileAuctionCategoryLeftSection from '@/components/LeftSection/components/MobileAuctionCategoryLeftSection/MobileAuctionCategoryLeftSection';
import MaxLayout from '@/components/MaxLayout';

import * as S from './Basicauction.css';

function Home({ searchParams }: { searchParams: GetBasicAuctionListParams }) {
  return (
    <MaxLayout>
      <div className={S.basicAuctionContainer}>
        <AuctionCategoryLeftSection />
        <section className={S.rightSection}>
          <BreadcrumbSection />
          <div className={S.topInfoSection}>
            <MobileAuctionCategoryLeftSection />
            <div className={S.optionSection}>
              <Checkbox />
              <AuctionDropDown />
            </div>
          </div>
          <BasicAuction searchParams={searchParams} />
        </section>
      </div>
    </MaxLayout>
  );
}

export default Home;
