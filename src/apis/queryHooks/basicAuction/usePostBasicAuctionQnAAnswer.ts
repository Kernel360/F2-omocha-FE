import { postAuctionQnAAnswer } from '@/apis/queryFunctions/basicAuction';
import {
  PostAuctionQnAAnswerParams,
  PostAuctionQnAAnswerResponseData,
} from '@/apis/types/basicAuction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Response } from '@/apis/types/common';

function usePostAuctionQnAAnswer() {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: (data: PostAuctionQnAAnswerParams) => postAuctionQnAAnswer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctionQnAList'] });
    },
    onError: (e: AxiosError<Response<PostAuctionQnAAnswerResponseData>>) => {
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

export default usePostAuctionQnAAnswer;
