'use client';

import Link from 'next/link';

import useGetUser from '@/apis/queryHooks/User/useGetUser';

import * as S from './MypageUserSection.css';

function MypageUserSection() {
  const user = useGetUser();

  return (
    <div className={S.profile}>
      <h2 className={S.profileTitle}>{user?.data?.email}</h2>
      <Link href="/mypage/heart" scroll={false}>
        <div className={S.heart}>
          <span>찜</span>
          <span>{user?.data?.member_id}</span>
        </div>
      </Link>
    </div>
  );
}

export default MypageUserSection;
