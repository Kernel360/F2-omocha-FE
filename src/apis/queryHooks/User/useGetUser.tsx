import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/apis/queryFunctions/User';

function useGetUser() {
  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUser(),
  });
  return { data };
}

export default useGetUser;
