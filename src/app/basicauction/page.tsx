import { Metadata } from 'next';

import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import Checkbox from '@/app/basicauction/components/checkbox';
import BasicAuctionClientPage from '@/components/BasicAuctionClientPage';
import BreadcrumbSection from '@/components/BreadcrumbSection';
import ClientSidePageRef from '@/components/ClientPageTrackingPageView';
import AuctionCategoryLeftSection from '@/components/LeftSection/components/AuctionCategoryLeftSection/AuctionCategoryLeftSection';
import MobileAuctionCategoryLeftSection from '@/components/LeftSection/components/MobileAuctionCategoryLeftSection/MobileAuctionCategoryLeftSection';
import MaxLayout from '@/components/MaxLayout';
import EVENT_ID from '@/static/eventId';
import { flattenCategories } from '@/utils/flattenCategoriesTree';
import getMetadata from '@/utils/getMetadata';

import * as S from './Basicauction.css';

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

  try {
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
    });
  } catch (error) {
    console.error(error);
    return getMetadata({
      title: 'Auction Detail',
      asPath: `/basicauction`,
    });
  }
};

function Home() {
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
          <BasicAuctionClientPage />
        </section>
      </div>
      <ClientSidePageRef eventId={EVENT_ID.AUCTION_LIST_PAGE_VIEWED} />
    </MaxLayout>
  );
}

export default Home;
