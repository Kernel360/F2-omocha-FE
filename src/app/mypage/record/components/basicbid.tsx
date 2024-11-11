'use client';

import CommonImage from '@/components/CommonImage';

import * as S from './BasicBid.css';

const LISTS = [
  {
    id: 1,
    title: '팔아요',
    image: 'https://via.placeholder.com/280x200',
    bidStatus: '낙찰',
    currentPrice: 20000,
    endDate: '2024-10-14 11:43:34',
  },
  {
    id: 2,
    title: '팔아요',
    image: 'https://via.placeholder.com/280x200',
    bidStatus: '입찰',
    currentPrice: 20000,
    endDate: '2024-10-14 11:43:34',
  },
  {
    id: 3,
    title: '팔아요',
    image: 'https://via.placeholder.com/280x200',
    bidStatus: '입찰',
    currentPrice: 30000,
    endDate: '2024-10-14 11:43:34',
  },
  {
    id: 4,
    title: '팔아요',
    image: 'https://via.placeholder.com/280x200',
    bidStatus: '패찰',
    currentPrice: 20000,
    endDate: '2024-10-14 11:43:34',
  },
  {
    id: 5,
    title: '팔아요',
    image: 'https://via.placeholder.com/280x200',
    bidStatus: '패찰',
    currentPrice: 20000,
    endDate: '2024-10-14 11:43:34',
  },
];

export default function BasicBid() {
  const getBidStatusStyle = (bidStatus: string) => {
    if (bidStatus === '낙찰') {
      return S.bidStatus.concluded;
    }

    if (bidStatus === '입찰') {
      return S.bidStatus.bidding;
    }

    if (bidStatus === '패찰') {
      return S.bidStatus.defeat;
    }

    return S.bidStatus.default;
  };

  return (
    <ul className={S.basicBid}>
      {LISTS.map(list => (
        <li className={S.list} key={list.id}>
          <CommonImage
            className={S.image}
            src={list.image}
            width={120}
            height={130}
            alt="경매 사진"
          />
          <ul className={S.listRight}>
            <li>
              <span className={S.listName}>상품명</span>
              <span className={S.listValue}>{list.title}</span>
            </li>
            <li>
              <span className={S.listName}>상태</span>
              <span className={`${S.listValue} ${getBidStatusStyle(list.bidStatus)}`}>
                {list.bidStatus}
              </span>
            </li>
            <li>
              <span className={S.listName}>현재가</span>
              <span className={S.listValue}>{`${list.currentPrice} 원`}</span>
            </li>
            <li>
              <span className={S.listName}>종료</span>
              <span className={S.listValue}>{list.endDate}</span>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
}
