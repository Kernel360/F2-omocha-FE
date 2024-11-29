import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import { BasicAuctionResponseData } from '@/apis/types/basicAuction';
import MaxLayout from '@/components/MaxLayout';
import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCookie';
import { flattenCategories } from '@/utils/flattenCategoriesTree';
import getMetadata from '@/utils/getMetadata';

import BasicAuctionInfo from './BasicAuctionInfo';

interface BasicAuctionDetailPageProps {
  params: {
    id: number;
  };
}

export const generateMetadata = async ({
  params: { id },
}: BasicAuctionDetailPageProps): Promise<Metadata> => {
  try {
    const auctionData = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/auctions/${id}`,
    )
      .then(res => res.json())
      .then(jsonRes => jsonRes.result_data);

    const flattenCategoriesList = flattenCategories(auctionData.categories);
    const categoryId = flattenCategoriesList[flattenCategoriesList.length - 1].category_id;
    const categoryName = flattenCategoriesList[flattenCategoriesList.length - 1].name;

    return getMetadata({
      title: `${categoryName} > ${auctionData.title}`,
      asPath: `/basicauction/${id}?categoryId=${categoryId}`,
      ogImage: `${process.env.NEXT_PUBLIC_S3_URL}${auctionData.thumbnail_path}`,
    });
  } catch (error) {
    console.error(error);
    return getMetadata({
      title: 'Auction Detail',
      asPath: `/basicauction/${id}`,
    });
  }
};

async function BasicAuctionDetailPage({ params }: BasicAuctionDetailPageProps) {
  const queryClient = await usePrefetchQueryWithCookie<
    BasicAuctionResponseData,
    ['basicAuction', typeof params.id]
  >({
    queryKey: ['basicAuction', params.id],
    api: `/v2/auctions/${params.id}`,
  });

  return (
    <MaxLayout>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BasicAuctionInfo id={params.id} />
      </HydrationBoundary>
    </MaxLayout>
  );
}

export default BasicAuctionDetailPage;
