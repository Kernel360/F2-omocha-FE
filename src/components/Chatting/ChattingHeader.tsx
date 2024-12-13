import Link from 'next/link';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import { OpenAuctionInfo } from '@/apis/types/chat';
import CommonImage from '@/components/CommonImage';

import * as S from './Chatting.css';

interface ChattingHeaderProps {
  openAuctionInfo: OpenAuctionInfo;
}

function ChattingHeader({ openAuctionInfo }: ChattingHeaderProps) {
  const { data: user } = useGetUser();
  const other =
    openAuctionInfo.seller_id === user?.member_id
      ? openAuctionInfo.buyer_name
      : openAuctionInfo.seller_name;

  return (
    <>
      <div className={S.chatroomHeader}>
        <div className={S.chatroomUserSection}>
          <span className={S.user}>{other}</span>
          {/* <span
            className={S.user}
          >{`구매자: ${openAuctionInfo.buyer_name || openAuctionInfo.buyer_id}`}</span>
          <span
            className={S.user}
          >{`판매자: ${openAuctionInfo.seller_name || openAuctionInfo.seller_id}`}</span> */}
        </div>
      </div>
      <Link href={`/basicauction/${openAuctionInfo.auction_id}`} scroll={false}>
        <div className={S.chatroomInfoSection}>
          <CommonImage
            src={`${process.env.NEXT_PUBLIC_S3_URL}${openAuctionInfo.thumbnail_path}`}
            alt="상품 이미지"
            width={40}
            height={40}
            className={S.chatroomImageInfo}
          />
          <div className={S.chatroomInfoWrapper}>
            <span className={S.chatroomTitleInfo}>{openAuctionInfo.room_name}</span>
            <span className={S.chatroomPriceInfo}>
              {openAuctionInfo.conclude_price.toLocaleString('ko-kr')}원
            </span>
          </div>
          {/* <button 아직 상태 바꾸는 api가 없어서 주석처리 해놓음.
            type="button"
            className={S.completeButton}
            onClick={e => {
              e.stopPropagation();
              console.log('dhksfy');
            }}
          >
            거래 완료
          </button> */}
        </div>
      </Link>
    </>
  );
}

export default ChattingHeader;
