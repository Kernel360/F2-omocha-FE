import * as S from '@/app/mypage/record/components/BasicBidAuction.css';

export const getAuctionStatusStyle = (bidStatus: string) => {
  // 경매의 상태 (경매)
  if (bidStatus === 'CONCLUDED') {
    return S.auctionStatus.concluded;
  }

  if (bidStatus === 'BIDDING') {
    return S.auctionStatus.bidding;
  }

  if (bidStatus === 'NO_BIDS') {
    return S.auctionStatus.defeat;
  }

  if (bidStatus === 'COMPLETE') {
    return S.auctionStatus.complete;
  }

  return S.bidStatus.default;
};

export const getBidStatusStyle = (bidStatus: string) => {
  // 유저와 유저가 건 경매의 입찰 상태 (유저-경매)
  if (bidStatus === '낙찰') {
    return S.bidStatus.concluded;
  }

  if (bidStatus === '입찰중') {
    return S.bidStatus.bidding;
  }

  if (bidStatus === '패찰') {
    return S.bidStatus.defeat;
  }

  return S.bidStatus.default;
};
