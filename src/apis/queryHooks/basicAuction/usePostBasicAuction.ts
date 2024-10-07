import { useMutation } from '@tanstack/react-query';

import { postBasicAuction } from '@/apis/queryFunctions/basicAuction';
import { PostBasicAuctionParams } from '@/apis/types/basicAuction';

function usePostBasicAuction() {
  const { mutate, error } = useMutation({
    mutationFn: (param: PostBasicAuctionParams) => postBasicAuction(param),
    onSuccess: () => {
      // queryClient.invalidateQueries 추가 필요
    },
  });

  return { mutate, error };
}

export default usePostBasicAuction;
