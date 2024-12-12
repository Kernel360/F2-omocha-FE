import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/apis/queryFunctions/User';
import { useAuth } from '@/provider/authProvider';
import getAuthTokens from '@/utils/getAuthTokens';

export interface Test {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

function useGetUser() {
  const { isLoggedIn } = useAuth();

  const tokens = getAuthTokens();

  const { data, isLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUser(tokens),
    enabled: !!isLoggedIn && !!tokens.accessToken,
  });

  return { data: data?.result_data, isLoading };
}

export default useGetUser;
