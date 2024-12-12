import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { deleteAuction } from '@/apis/queryFunctions/basicAuction';
import { Response } from '@/apis/types/common';
import { useCookies } from '@/provider/cookiesProvider';
import { useToast } from '@/provider/toastProvider';

function useDeleteBasicAuction() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showToast } = useToast();
  const { clientToken } = useCookies();

  const { mutate, error } = useMutation({
    mutationFn: (id: number) => deleteAuction(id, clientToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basicAuctionList'] });
      router.push('/basicauction', { scroll: false });
      showToast('success', '경매가 성공적으로 삭제되었습니다.');
    },
    onError: (e: AxiosError<Response<string>>) => {
      if (e.response) {
        showToast('error', `${e.response.data.result_msg}`);
      } else {
        // 네트워크 에러나 기타 처리되지 않은 에러 처리
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });

  return { mutate, error };
}

export default useDeleteBasicAuction;
