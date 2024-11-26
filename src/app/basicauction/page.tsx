import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import BasicAuction from '@/app/basicauction/basicauction';
import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import Checkbox from '@/app/basicauction/components/checkbox';
import LeftSection from '@/components/LeftSection';
import MaxLayout from '@/components/MaxLayout';

import * as S from './Basicauction.css';
import WebBreadcrumbSection from './components/WebBreadcrumbSection';

function Home({ searchParams }: { searchParams: GetBasicAuctionListParams }) {
  return (
    <MaxLayout>
      <div className={S.basicAuctionContainer}>
        <LeftSection />
        <section className={S.rightSection}>
          <WebBreadcrumbSection />
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
