import * as S from './AuctionInfo.css';

interface AuctionInfoProps {
  title: string;
  startPrice: number;
  nowPrice: number;
  remainingTime: number;
  bidCount: number;
}

function AuctionInfo(SAMPLE: AuctionInfoProps) {
  const { title, startPrice, nowPrice, remainingTime, bidCount } = SAMPLE;
  return (
    <div className={S.infoWrapper}>
      <div className={S.infoTitle}>{title}</div>
      <div className={S.infoRow}>
        <span className={S.infoRowTitle}>시작가</span>
        <span>
          {startPrice ? startPrice.toLocaleString('ko-KR') : '3,000'}
          <span>원</span>
        </span>
      </div>
      <div className={`${S.infoRow} ${S.nowPrice}`}>
        <span className={S.infoRowTitle}>현재가</span>
        <span>
          {nowPrice ? nowPrice.toLocaleString('ko-KR') : '3,000'}
          <span>원</span>
        </span>
      </div>
      <hr className={S.division} />
      <div className={S.infoRow}>
        <span className={S.infoRowTitle}>남은 시간</span>
        <div>{remainingTime}</div>
      </div>
      <div className={S.infoRow}>
        <span className={S.infoRowTitle}>입찰 기록</span>
        <div className={S.infoRight}>
          <span>{bidCount}회</span>
          <button type="button" className={S.infoButton}>
            기록 보기
          </button>
        </div>
      </div>
      <div className={S.infoRow}>
        <span className={S.infoRowTitle}>입찰 의망가</span>
        <div className={S.infoRight}>
          <input type="number" />
          <span>원</span>
        </div>
      </div>
      <button type="button" className={`${S.infoButton} ${S.bidButton}`}>
        입찰하기
      </button>
    </div>
  );
}

export default AuctionInfo;
