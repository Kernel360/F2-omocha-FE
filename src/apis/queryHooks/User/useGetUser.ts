import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/apis/queryFunctions/User';
import { useAuth } from '@/provider/authProvider';

function useGetUser() {
  const { isLoggedIn } = useAuth();
  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUser(),
    enabled: !!isLoggedIn,
  });

  return { data: data?.result_data };
}

export default useGetUser;
