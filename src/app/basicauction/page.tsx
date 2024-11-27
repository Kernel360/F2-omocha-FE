import { Metadata } from 'next';

import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import BasicAuction from '@/app/basicauction/basicauction';
import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import Checkbox from '@/app/basicauction/components/checkbox';
import LeftSection from '@/components/LeftSection';
import MaxLayout from '@/components/MaxLayout';
import getMetadata from '@/utils/getMetadata';

import * as S from './Basicauction.css';
import WebBreadcrumbSection from './components/WebBreadcrumbSection';

interface GenerateMetadataProps {
  searchParams: { [key: string]: string | undefined };
}

export const generateMetadata = async ({
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> => {
  const queryValue = searchParams.categoryId;

  // api 호출해서 카테고리 이름 가져오기
  // 맨 아래있는 것으로 가져오기
  // 사진은 배포 하고나 볼 수 있는 듯..

  return getMetadata({
    title: `${queryValue}`, // TODO 제일 하단의 요소로 가져와야함.
  });
};

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
