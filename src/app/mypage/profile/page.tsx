'use client';

import ChangePassword from '@/app/mypage/profile/components/changepassword';
import MypageProfileClientPage from '@/components/MypageProfileClientPage';
import useRequireAuth from '@/hooks/useRequireAuth';

import * as S from './Profile.css';

function Home() {
  useRequireAuth();

  return (
    <div className={S.profile}>
      <h3>회원 정보 수정</h3>
      <section className={S.section}>
        <h3 className={S.sectionTitle}>프로필</h3>
        <MypageProfileClientPage />
      </section>
      <section className={S.section}>
        <ChangePassword />
      </section>
    </div>
  );
}

export default Home;
