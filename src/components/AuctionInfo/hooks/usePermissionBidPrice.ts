import { useState } from 'react';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import { useAuth } from '@/provider/authProvider';

export function usePermissionBidPrice(sellerId: number) {
  const { isLoggedIn } = useAuth();
  const { data: user } = useGetUser();
  const [expired, setExpired] = useState(false);

  const canNotBid = () => {
    if (expired) {
      return '경매 진행 기간이 아닙니다.';
    }
    if (!isLoggedIn) {
      return '로그인 후 사용 가능한 서비스입니다.';
    }
    return '';
  };

  const canDelete = sellerId === user?.member_id;

  return {
    expired,
    setExpired,
    user,
    canNotBid,
    canDelete,
  };
}
