import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import Checkbox from '@/app/basicauction/components/checkbox';
import BasicAuctionClientPage from '@/components/BasicAuctionClientPage';
import BreadcrumbSection from '@/components/BreadcrumbSection';
import ClientSidePageRef from '@/components/ClientPageTrackingPageView';
import AuctionCategoryLeftSection from '@/components/LeftSection/components/AuctionCategoryLeftSection/AuctionCategoryLeftSection';
import MobileAuctionCategoryLeftSection from '@/components/LeftSection/components/MobileAuctionCategoryLeftSection/MobileAuctionCategoryLeftSection';
import MaxLayout from '@/components/MaxLayout';
import usePrefetchQueriesWithCookie from '@/hooks/usePrefetchQueriesWithCookie';
import EVENT_ID from '@/static/eventId';
import flattenCategoriesTree from '@/utils/flattenCategoriesTree';
import getMetadata from '@/utils/getMetadata';
import { convertQueryParamsObjectToString, filteredParams } from '@/utils/paramUtils';

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

    const flattenCategoriesList = flattenCategoriesTree(categoryListTree);
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

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: number | string | undefined };
}) {
  const params = {
    ...searchParams,
    page: Math.max(Number(searchParams.page ?? 1) - 1, 0),
    categoryId: Number(searchParams.categoryId) || null, // 0일 때 undefined로 변환
    size: 20, // 사이즈 2로 ALL 에서 검토
  };

  const newParams = filteredParams<GetBasicAuctionListParams>(params);

  const queryClient = await usePrefetchQueriesWithCookie([
    {
      queryKey: ['basicAuctionList', newParams],
      api: `/v2/auctions?${convertQueryParamsObjectToString<GetBasicAuctionListParams>(newParams)}`,
    },
  ]);

  return (
    <MaxLayout>
      <div className={S.basicAuctionContainer}>
        <AuctionCategoryLeftSection />
        <section className={S.rightSection}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <BreadcrumbSection pickCategoryProps={params.categoryId} />
            <div className={S.topInfoSection}>
              <MobileAuctionCategoryLeftSection />
              <div className={S.optionSection}>
                <Checkbox />
                <AuctionDropDown />
              </div>
            </div>
            <BasicAuctionClientPage />
          </HydrationBoundary>
        </section>
      </div>
      <ClientSidePageRef eventId={EVENT_ID.AUCTION_LIST_PAGE_VIEWED} />
    </MaxLayout>
  );
}

export default Home;
