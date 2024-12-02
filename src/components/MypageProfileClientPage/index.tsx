'use client';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import CommonInput from '@/components/CommonInput';

function MypageProfileClientPage() {
  const { data: user } = useGetUser();

  if (!user) return null;
  return (
    <>
      <CommonInput label="아이디" id="email" value={user.email} disabled />
      <CommonInput label="닉네임" id="text" value={user.nickname} disabled />
    </>
  );
}

export default MypageProfileClientPage;
