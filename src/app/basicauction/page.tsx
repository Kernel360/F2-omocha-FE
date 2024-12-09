import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import { AuctionData, GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import { ListResponse } from '@/apis/types/common';
import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import Checkbox from '@/app/basicauction/components/checkbox';
import BasicAuctionClientPage from '@/components/BasicAuctionClientPage';
import BreadcrumbSection from '@/components/BreadcrumbSection';
import AuctionCategoryLeftSection from '@/components/LeftSection/components/AuctionCategoryLeftSection/AuctionCategoryLeftSection';
import MobileAuctionCategoryLeftSection from '@/components/LeftSection/components/MobileAuctionCategoryLeftSection/MobileAuctionCategoryLeftSection';
import MaxLayout from '@/components/MaxLayout';
import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCookie';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';
import filteredParams from '@/utils/filteredParams';
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

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: number | string | undefined };
}) {
  const params = {
    ...searchParams,
    page: Math.max(Number(searchParams.page ?? 1) - 1, 0),
    categoryId: Number(searchParams.categoryId) || undefined, // 0일 때 undefined로 변환
    size: 20, // 사이즈 2로 ALL 에서 검토
  };

  const newParams = filteredParams<GetBasicAuctionListParams>(params);

  const queryClient = await usePrefetchQueryWithCookie<
    ListResponse<AuctionData[]>,
    ['basicAuctionList', typeof newParams]
  >({
    queryKey: ['basicAuctionList', newParams],
    api: `/v2/auctions?${convertQueryParamsObjectToString<GetBasicAuctionListParams>(newParams)}`,
  });

  return (
    <MaxLayout>
      <div className={S.basicAuctionContainer}>
        <Suspense fallback={<>AuctionCategoryLeftSection</>}>
          <AuctionCategoryLeftSection />
        </Suspense>
        <section className={S.rightSection}>
          <Suspense fallback={<>BreadcrumbSection</>}>
            <BreadcrumbSection />
          </Suspense>
          <div className={S.topInfoSection}>
            <Suspense fallback={<>MobileAuctionCategoryLeftSection</>}>
              <MobileAuctionCategoryLeftSection />
            </Suspense>
            <div className={S.optionSection}>
              <Checkbox />
              <AuctionDropDown />
            </div>
          </div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <BasicAuctionClientPage />
          </HydrationBoundary>
        </section>
      </div>
    </MaxLayout>
  );
}

export default Home;
