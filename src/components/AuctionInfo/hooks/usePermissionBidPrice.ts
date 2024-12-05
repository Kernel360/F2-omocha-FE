import { useState } from 'react';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import useGetBasicAuctionBidList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionBidList';
import { useAuth } from '@/provider/authProvider';

export function usePermissionBidPrice(auctionId: number, sellerId: number) {
  const { isLoggedIn } = useAuth();

  const { data: user } = useGetUser();
  const [expired, setExpired] = useState('');
  const { data: auctionBidList } = useGetBasicAuctionBidList(auctionId);

  const isPrevBuyer = (): boolean => {
    if (auctionBidList?.result_data.length === 0) return false;
    return auctionBidList?.result_data[0].buyer_member_id === user?.member_id;
  };

  const baseConditions = [
    { condition: expired === 'expired', message: '경매 진행 기간이 아닙니다.' },
    {
      condition: expired === 'concluded' || expired === 'completed',
      message: '완료된 경매입니다.',
    },
    { condition: !isLoggedIn, message: '로그인 후 사용 가능한 서비스입니다.' },
  ];

  const getErrorMessage = (
    additionalConditions: { condition: boolean; message: string }[] = [],
  ) => {
    const allConditions = [...baseConditions, ...additionalConditions];
    const failedCondition = allConditions.find(({ condition }) => condition);
    return failedCondition?.message || '';
  };

  const canNotBidForBid = () =>
    getErrorMessage([{ condition: isPrevBuyer(), message: '이미 선두 구매자입니다.' }]);

  const canNotBidForInstantBuy = () => getErrorMessage();

  const canDelete = sellerId === user?.member_id;

  return {
    isPrevBuyer,
    expired,
    setExpired,
    user,
    canNotBidForBid,
    canNotBidForInstantBuy,
    canDelete,
  };
}
