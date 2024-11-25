'use client';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import CommonInput from '@/components/CommonInput';

function MypageProfileClientPage() {
  const { data: user } = useGetUser();

  return (
    <>
      <CommonInput label="아이디" id="email" value={user?.email} disabled />
      <CommonInput label="닉네임" id="text" value={user?.nick_name} disabled />
    </>
  );
}

export default MypageProfileClientPage;
