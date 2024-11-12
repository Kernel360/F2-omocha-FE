import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getCategory } from '@/apis/queryFunctions/category';
import Checkbox from '@/app/basicauction/components/checkbox';
import AuctionCategory from '@/components/AuctionCategory';

import * as S from './LeftSection.css';

export default async function LeftSection() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(),
  });

  return (
    <section className={S.leftSection}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AuctionCategory />
      </HydrationBoundary>
    </section>
  );
}
