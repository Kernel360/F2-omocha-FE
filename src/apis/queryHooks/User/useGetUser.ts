import { useQuery } from '@tanstack/react-query';
// import { getCookie } from 'cookies-next';

import { getUser } from '@/apis/queryFunctions/User';
import { useAuth } from '@/provider/authProvider';
// import { useCookies } from '@/provider/cookiesProvider';
import getAuthTokens from '@/utils/getAuthTokens';

export interface Test {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

function useGetUser() {
  const { isLoggedIn } = useAuth();
  // const { clientToken } = useCookies();
  const tokens = getAuthTokens();

  // const accessToken = getCookie('accessToken', { path: '/', domain: 'omocha-acution.com' });
  // const refreshToken = getCookie('refreshToken', { path: '/', domain: 'omocha-acution.com' });
  // console.log('clientToken in useGetUser', clientToken);
  // console.log('accessToken in useGetUser', accessToken);
  // console.log('refreshToken in useGetUser', refreshToken);

  // console.log('NEWNEWNEWNEW tokens in useGetUser', tokens);

  const { data, isLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUser(tokens),
    enabled: !!isLoggedIn && !!tokens.accessToken,
  });

  return { data: data?.result_data, isLoading };
}

export default useGetUser;
