import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { UserResponseData } from '@/apis/types/User';
import MaxLayout from '@/components/MaxLayout';
import MypageCategory from '@/components/MypageCategory';
import MypageUserSection from '@/components/MypageUserSection';
import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCoookie';

import * as S from './Layout.css';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = await usePrefetchQueryWithCookie<UserResponseData, ['userInfo']>({
    queryKey: ['userInfo'],
    api: '/v2/myinfo/me',
  });

  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ul className={S.categoryList}>
              <MypageUserSection />
              <MypageCategory />
            </ul>
            <div className={S.page}>{children}</div>
          </HydrationBoundary>
        </div>
      </MaxLayout>
    </div>
  );
}
