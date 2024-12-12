import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postBasicAuctionBid } from '@/apis/queryFunctions/basicAuction';
import { PostBasicAuctionBidParams } from '@/apis/types/basicAuction';
import { Response } from '@/apis/types/common';
import mixpanel from '@/lib/mixpanel';
import { useToast } from '@/provider/toastProvider';
import EVENT_ID from '@/static/eventId';
import { useCookies } from '@/provider/cookiesProvider';

function usePostBasicAuctionBid() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { clientToken } = useCookies();
  const { mutate, error } = useMutation({
    mutationFn: ({ id, params }: { id: number; params: PostBasicAuctionBidParams }) =>
      postBasicAuctionBid(id, params, clientToken),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: ['basicAuction', params.id] });
      queryClient.invalidateQueries({ queryKey: ['basicAuctionList'] });
      queryClient.invalidateQueries({ queryKey: ['basicAuctionBidList', params.id] });
      queryClient.invalidateQueries({ queryKey: ['nowPrice', params.id] });
      queryClient.invalidateQueries({ queryKey: ['bidAuctionHistories'] });
      showToast('success', '입찰에 성공했습니다.');
      mixpanel.track(EVENT_ID.AUCTION_DETAIL_BID_BUTTON_CLICKED, {
        auction_id: params.id,
        bid_price: params.params.bid_price,
      });
    },
    onError: (e: AxiosError<Response<string>>, params) => {
      queryClient.invalidateQueries({ queryKey: ['nowPrice', params.id] });
      if (e.response) {
        showToast('error', `${e.response.data.result_msg}`);
      } else {
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });

  return { mutate, error };
}

export default usePostBasicAuctionBid;
