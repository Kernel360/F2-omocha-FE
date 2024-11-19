import useGetBidAuctionHistoriesUnit from '@/apis/queryHooks/User/useGetBidAuctionHistoriesUnit';

import * as S from './BasicBidAuctionBidList.css';

interface BasicBidAuctionBidListProps {
  bidAuctionHistoriesId: number;
}

function BasicBidAuctionBidList({ bidAuctionHistoriesId }: BasicBidAuctionBidListProps) {
  const { data: bidAuctionHistories } = useGetBidAuctionHistoriesUnit(bidAuctionHistoriesId);

  if (!bidAuctionHistories) {
    return null;
  }

  return (
    <div className={S.container}>
      {bidAuctionHistories.content.length === 0 ? (
        <div className={S.bidUnitWarning}>입찰 내역이 보이지 않을 경우 문의해주십시오.</div>
      ) : (
        <table className={S.table}>
          <thead className={S.tableHeader}>
            <tr>
              <th className={S.tableHeaderCell}>날짜</th>
              <th className={S.tableHeaderCell}>입찰 금액</th>
            </tr>
          </thead>
          <tbody className={S.tableBody}>
            {bidAuctionHistories.content.map((bidAuctionHistory, index) => (
              <tr
                key={bidAuctionHistory.created_at}
                className={index % 2 === 0 ? S.tableRow.even : S.tableRow.odd}
              >
                <td className={S.tableCell}>{bidAuctionHistory.created_at}</td>
                <td className={S.tableCell}>{bidAuctionHistory.bid_price.toLocaleString()} 원</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BasicBidAuctionBidList;
