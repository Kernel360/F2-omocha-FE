import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postReview } from '@/apis/queryFunctions/review';
import { Response } from '@/apis/types/common';
import { PostReview } from '@/apis/types/review';
import { useToast } from '@/provider/toastProvider';

function usePostReview() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate, error } = useMutation({
    mutationFn: ({ id, params }: { id: number; params: PostReview }) => postReview(id, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bidAuctionHistories'] });
      showToast('success', '리뷰 등록에 성공했습니다.');
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

export default usePostReview;
