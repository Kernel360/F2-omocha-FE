import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionQueryFn } from '@/apis/queryFunctions/basicAuctionQueryFn';

// interface BasicAuctionData {
//   auction_type: string;
//   bid_unit: number;
//   content: string;
//   end_date: string;
//   start_date: string;
//   image_keys: string[];
//   start_price: number;
// }

// interface BasicAuctionResponse {
//   result_data: BasicAuctionData;
//   result_msg: string;
//   status_code: string;
// }

function useGetBasicAuction(id: number) {
  const { data } = useQuery({
    queryKey: ['basicAuction', id],
    queryFn: () => getBasicAuctionQueryFn(id),
    // initialData: () => getBasicAuctionQueryFn(id),
  });
  return { data };
}

export default useGetBasicAuction;
