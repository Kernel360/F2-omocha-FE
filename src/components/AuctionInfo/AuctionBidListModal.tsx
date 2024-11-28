import { usePathname, useRouter } from 'next/navigation';

import useGetBasicAuctionBidList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionBidList';
import { useAuth } from '@/provider/authProvider';

import * as S from './AuctionBidListModal.css';

interface AuctionBidListModalProps {
  id: number;
}

function AuctionBidListModal({ id }: AuctionBidListModalProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useGetBasicAuctionBidList(id);

  const moveToLogin = () => {
    router.push(`/login?prevUrl=${pathname}`, { scroll: false });
  };

  if (!isLoggedIn) {
    return (
      <div className={S.needLoginSection}>
        <div className={S.noUserMessage}>로그인이 필요한 서비스 입니다.</div>
        <button className={S.loginButton} type="button" onClick={moveToLogin}>
          로그인하러 가기
        </button>
      </div>
    );
  }

  if (!data?.result_data) {
    return null;
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
      </table>
      <div className={S.scrollableBody}>
        <table className={S.table}>
          <tbody>
            {data.result_data.length > 0 ? (
              data.result_data.map(unit => (
                <tr key={unit.buyer_member_id}>
                  <td className={S.td}>{unit.buyer_member_id}</td>
                  <td className={S.td}>{unit.bid_price.toLocaleString('ko-kr')}</td>
                  <td className={S.td}>{unit.created_at}</td>
                </tr>
              ))
            ) : (
              <td className={S.noBidDataContent} colSpan={3}>
                아직 입찰 내역이 없습니다.
              </td>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuctionBidListModal;
