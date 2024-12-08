import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

const useRequireAuth = () => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login'); // 토큰이 없으면 로그인 페이지로 이동
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  return { isCheckingAuth };
};

export default useRequireAuth;
