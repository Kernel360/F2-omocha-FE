import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postBasicAuction } from '@/apis/queryFunctions/basicAuction';

function usePostBasicAuction() {
  const queryClinet = useQueryClient();
  const router = useRouter();

  const { mutate, error } = useMutation({
    mutationFn: (param: FormData) => postBasicAuction(param),
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ['basicAuctionList'] });
      router.push('/basicauction');
    },
  });

  return { mutate, error };
}

export default usePostBasicAuction;
