import { useQuery } from '@tanstack/react-query';

import { getEmailValidation } from '@/apis/queryFunctions/Auth';

function useGetEmailValidation(email: string | null) {
  const { data, refetch } = useQuery({
    queryKey: ['email', email],
    queryFn: () => getEmailValidation({ email }),
    enabled: !!email,
  });

  return { data: data?.result_data, refetch };
}

export default useGetEmailValidation;
