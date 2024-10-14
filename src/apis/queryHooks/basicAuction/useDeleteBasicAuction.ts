import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { deleteAuction } from '@/apis/queryFunctions/basicAuction';
import { Response } from '@/apis/types/common';

function useDeleteBasicAuction() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, error } = useMutation({
    mutationFn: (id: number) => deleteAuction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basicAuctionList'] });
      router.push('/basicauction');
    },
    onError: (e: AxiosError<Response<string>>) => {
      if (e.response) {
        alert(`${e.response.data.result_msg}`);
      } else {
        // 네트워크 에러나 기타 처리되지 않은 에러 처리
        console.log('알 수 없는 오류 발생', e.message);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  return { mutate, error };
}

export default useDeleteBasicAuction;
