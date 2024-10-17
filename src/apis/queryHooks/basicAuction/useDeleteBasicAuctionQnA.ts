import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deleteAuctionQnA } from '@/apis/queryFunctions/basicAuction';
import { Response } from '@/apis/types/common';

function useDeleteBasicAuctionQnA() {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: (id: number) => deleteAuctionQnA(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctionQnAList'] });
    },
    onError: (e: AxiosError<Response<string>>) => {
      if (e.response) {
        alert(`${e.response.data.result_msg}`);
      } else {
        console.log('알 수 없는 오류 발생', e.message);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
  return { mutate, error };
}

export default useDeleteBasicAuctionQnA;
