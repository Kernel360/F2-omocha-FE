import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/apis/queryFunctions/User';
import { useAuth } from '@/provider/authProvider';
import { useCookies } from '@/provider/cookiesProvider';

function useGetUser() {
  const { isLoggedIn } = useAuth();
  const { clientToken } = useCookies();

  const { data, isLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUser(clientToken),
    enabled: !!isLoggedIn,
  });

  return { data: data?.result_data, isLoading };
}

export default useGetUser;
