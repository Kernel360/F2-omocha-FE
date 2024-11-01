import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deleteAuctionQnA } from '@/apis/queryFunctions/basicAuction';
import { Response } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';

function useDeleteBasicAuctionQnA() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate, error } = useMutation({
    mutationFn: (id: number) => deleteAuctionQnA(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctionQnAList'] });
      showToast('success', 'QnA에 삭제에 성공했습니다.');
    },
    onError: (e: AxiosError<Response<string>>) => {
      if (e.response) {
        showToast('error', `${e.response.data.result_msg}`);
      } else {
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });
  return { mutate, error };
}

export default useDeleteBasicAuctionQnA;
