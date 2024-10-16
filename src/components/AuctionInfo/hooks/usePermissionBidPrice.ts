import { useState } from 'react';

import { useAuth } from '@/provider/authProvider';
import useUserStore from '@/store/useUserStore';

export function usePermissionBidPrice(sellerId: number) {
  const { token } = useAuth();
  const user = useUserStore(state => state.user);

  const [expired, setExpired] = useState(false);

  const canNotBid = () => {
    if (expired) {
      return '경매 진행 기간이 아닙니다.';
    }
    if (!token) {
      return '로그인 후 사용 가능한 서비스입니다.';
    }
    return '';
  };

  const canDelete = sellerId === user?.member_id;

  return {
    expired,
    setExpired,
    token,
    canNotBid,
    canDelete,
  };
}
