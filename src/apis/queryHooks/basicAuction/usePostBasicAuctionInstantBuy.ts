import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postBasicAuctionInstantBuy } from '@/apis/queryFunctions/basicAuction';
import { Response } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';

function usePostBasicAuctionInstantBuy(id: number) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate, error } = useMutation({
    mutationFn: () => postBasicAuctionInstantBuy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basicAuction', id] });
      queryClient.invalidateQueries({ queryKey: ['basicAuctionList'] });
      queryClient.invalidateQueries({ queryKey: ['basicAuctionBidList', id] });
      queryClient.invalidateQueries({ queryKey: ['bidAuctionHistories'] });
      // queryClient.invalidateQueries({ queryKey: ['nowPrice', params.id] });
      showToast('success', '입찰에 성공했습니다.');
    },
    onError: (e: AxiosError<Response<string>>) => {
      queryClient.invalidateQueries({ queryKey: ['nowPrice', id] });
      if (e.response) {
        showToast('error', `입찰 가격이 즉시 구매 가격과 같거나 높습니다.`);
      } else {
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });

  return { mutate, error };
}

export default usePostBasicAuctionInstantBuy;
