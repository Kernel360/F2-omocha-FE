import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import { BasicAuctionResponseData } from '@/apis/types/basicAuction';
import MaxLayout from '@/components/MaxLayout';
import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCookie';
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
  const auctionData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/auctions/${id}`,
  ).then(res => res.json());

  return getMetadata({
    title: `${auctionData.result_data.categories[0].name}-${id}`, // 제일 하단의 요소로 가져와야하나.. // 아니면 url에 있는 값으로 가져와서 따로 category를 불러오야하나
    asPath: `/basicauction/${id}`,
    ogImage: `${process.env.NEXT_PUBLIC_S3_URL}${auctionData.result_data.thumbnail_path}`,
  });
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
