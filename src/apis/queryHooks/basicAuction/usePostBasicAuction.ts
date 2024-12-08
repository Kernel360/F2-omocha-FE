import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { postBasicAuction } from '@/apis/queryFunctions/basicAuction';
import { Response } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';

function usePostBasicAuction() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showToast } = useToast();

  const { mutate, error } = useMutation({
    mutationFn: (param: FormData) => postBasicAuction(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basicAuctionList'] });
      router.push('/basicauction?page=1', { scroll: false });
      showToast('success', '경매 등록에 성공했습니다.');
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

export default usePostBasicAuction;
