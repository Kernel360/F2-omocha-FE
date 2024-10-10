import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postBasicAuction } from '@/apis/queryFunctions/basicAuction';

function usePostBasicAuction() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, error } = useMutation({
    mutationFn: (param: FormData) => postBasicAuction(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basicAuctionList'] });
      router.push('/basicauction');
    },
  });

  return { mutate, error };
}

export default usePostBasicAuction;
