import ChangePassword from '@/app/mypage/profile/components/changepassword';
import ClientSidePageRef from '@/components/ClientPageTrackingPageView';
import MypageProfileClientPage from '@/components/MypageProfileClientPage';
import EVENT_ID from '@/static/eventId';

import * as S from './Profile.css';

function Home() {
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
      <ClientSidePageRef eventId={EVENT_ID.MYPAGE_PROFILE_PAGE_VIEWED} />
    </div>
  );
}

export default Home;
