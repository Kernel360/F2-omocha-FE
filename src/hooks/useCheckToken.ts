import { useEffect } from 'react';

import { useTokenStore } from '@/store/token';

function useCheckToken() {
  const { token, fetchToken } = useTokenStore();

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return token;
}

export default useCheckToken;
