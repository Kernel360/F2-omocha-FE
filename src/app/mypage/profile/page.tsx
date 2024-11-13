import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getUser } from '@/apis/queryFunctions/User';
import ChangePassword from '@/app/mypage/profile/components/changepassword';
import MypageProfileClientPage from '@/components/MypageProfileClientPage';

import * as S from './Profile.css';

async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUser(),
  });

  return (
    <div className={S.profile}>
      <h3>회원 정보 수정</h3>
      <section className={S.section}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MypageProfileClientPage />
        </HydrationBoundary>
      </section>
      <section className={S.section}>
        <ChangePassword />
      </section>
    </div>
  );
}

export default Home;
