import Image from 'next/image';

import * as S from './BasicSold.css';

const LISTS = [
  {
    id: 1,
    title: '팔아요',
    image: 'https://via.placeholder.com/280x200',
    soldStatus: '판매 완료',
    startPice: 10000,
    currentPrice: 20000,
    endDate: '2024-10-14 11:43:34',
  },
  {
    id: 2,
    title: '팔아요',
    image: 'https://via.placeholder.com/280x200',
    soldStatus: '유찰',
    startPice: 10000,
    currentPrice: 0,
    endDate: '2024-10-14 11:43:34',
  },
  {
    id: 3,
    title: '팔아요',
    image: 'https://via.placeholder.com/280x200',
    soldStatus: '판매중',
    startPice: 10000,
    currentPrice: 30000,
    endDate: '2024-10-14 11:43:34',
  },
  {
    id: 5,
    title: '팔아요',
    image: 'https://via.placeholder.com/280x200',
    soldStatus: '판매중',
    startPice: 10000,
    currentPrice: 20000,
    endDate: '2024-10-14 11:43:34',
  },
];

export default function BasicSold() {
  const getStatusStyle = (soldStatus: string) => {
    if (soldStatus === '판매 완료') {
      return S.soldStatus.concluded;
    }

    if (soldStatus === '판매중') {
      return S.soldStatus.bidding;
    }

    if (soldStatus === '유찰') {
      return S.soldStatus.defeat;
    }

    return S.soldStatus.default;
  };

  return (
    <ul className={S.basicSold}>
      {LISTS.map(list => {
        const priceDifference = list.currentPrice - list.startPice;
        const newPriceDifference = priceDifference > 0 ? priceDifference : 0;

        return (
          <li className={S.list} key={list.id}>
            <Image src={list.image} width={120} height={120} alt="경매 사진" />
            <ul className={S.listRight}>
              <li>
                <span className={S.listName}>상품명</span>
                <span className={S.listValue}>{list.title}</span>
              </li>
              <li>
                <span className={S.listName}>상태</span>
                <span className={`${S.listValue} ${getStatusStyle(list.soldStatus)}`}>
                  {list.soldStatus}
                </span>
              </li>
              <li>
                <span className={S.listName}>시작가</span>
                <span className={S.listValue}>{`${list.startPice} 원`}</span>
              </li>
              <li>
                <span className={S.listName}>현재가</span>
                <span className={S.listValue}>{`${list.currentPrice} 원 `}</span>
                <span
                  className={`${S.listValue} ${getStatusStyle(list.soldStatus)}`}
                >{`(+${newPriceDifference}원)`}</span>
              </li>
              <li>
                <span className={S.listName}>종료</span>
                <span className={S.listValue}>{list.endDate}</span>
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
