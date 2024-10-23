import { useQuery } from '@tanstack/react-query';

import { getEmailValidation } from '@/apis/queryFunctions/Auth';

function useGetEmailValidation(email: string | null) {
  const { data, error } = useQuery({
    queryKey: ['email', email],
    queryFn: () => getEmailValidation({ email }),
    enabled: !!email,
    retry: false,
  });

  return { data: data?.result_data, error };
}

export default useGetEmailValidation;
