import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postAuctionQnAAnswer } from '@/apis/queryFunctions/basicAuction';
import {
  PostAuctionQnAAnswerParams,
  PostAuctionQnAAnswerResponseData,
} from '@/apis/types/basicAuction';
import { Response } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';
import getAuthTokens from '@/utils/getAuthTokens';

function usePostAuctionQnAAnswer() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const tokens = getAuthTokens();

  const { mutate, error } = useMutation({
    mutationFn: (data: PostAuctionQnAAnswerParams) => postAuctionQnAAnswer(data, tokens),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctionQnAList'] });
      showToast('success', 'QnA 등록에 성공했습니다.');
    },
    onError: (e: AxiosError<Response<PostAuctionQnAAnswerResponseData>>) => {
      if (e.response) {
        showToast('error', `${e.response.data.result_msg}`);
      } else {
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });
  return { mutate, error };
}

export default usePostAuctionQnAAnswer;
