import useGetBasicAuctionBidList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionBidList';

import * as S from './AuctionBidListModal.css';

interface AuctionBidListModalProps {
  id: number;
}

function AuctionBidListModal({ id }: AuctionBidListModalProps) {
  const { data } = useGetBasicAuctionBidList(id);

  if (!data?.result_data) {
    return <div className={S.noDataMessage}>아직 목록이 없어용.</div>;
  }

  return (
    <div className={S.tableWrapper}>
      <table className={S.table}>
        <thead>
          <tr>
            <th className={S.th} scope="col">
              유저 ID
            </th>
            <th className={S.th} scope="col">
              입찰 금액
            </th>
            <th className={S.th} scope="col">
              입찰 시각
            </th>
          </tr>
        </thead>
        {data.result_data.map(unit => (
          <tr key={unit.buyer_id}>
            <td className={S.td}>{unit.buyer_id}</td>
            <td className={S.td}>{unit.bid_price.toLocaleString('ko-kr')}</td>
            <td className={S.td}>{unit.created_at}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default AuctionBidListModal;
