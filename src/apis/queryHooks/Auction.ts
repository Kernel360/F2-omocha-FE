import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';

import { postBasicAuction } from '@/apis/queryFunctions/Auction';
import { PostBasicAuctionParams } from '@/apis/types/Auction';

export const usePostBasicAuction = () => {
  const { mutate, error } = useMutation({
    mutationFn: (param: PostBasicAuctionParams) => postBasicAuction(param),
    onSuccess: () => {
      // queryClient.invalidateQueries 추가 필요
    },
  });

  return { mutate, error };
};
