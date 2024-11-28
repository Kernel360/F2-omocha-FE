import { Metadata } from 'next';

import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import BasicAuction from '@/app/basicauction/basicauction';
import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import Checkbox from '@/app/basicauction/components/checkbox';
import LeftSection from '@/components/LeftSection';
import MaxLayout from '@/components/MaxLayout';
import { flattenCategories } from '@/utils/flattenCategoriesTree';
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
  if (!queryValue) {
    return getMetadata({
      title: 'ALL',
      asPath: '/basicauction?page=1',
    });
  }
  const categoryListTree = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/categories/${queryValue}`,
  )
    .then(res => res.json())
    .then(jsonRes => jsonRes.result_data);

  const flattenCategoriesList = flattenCategories(categoryListTree);
  const categoryName = flattenCategoriesList[flattenCategoriesList.length - 1].name;

  return getMetadata({
    title: `${categoryName}`,
    asPath: `/basicauction?categoryId=${queryValue}&page=1`,
    // TODO 예쁜 사진이 있다면 그것으로 카테고리를 나타내서 openGraphImage를 설정하면 좋을 듯함.
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
