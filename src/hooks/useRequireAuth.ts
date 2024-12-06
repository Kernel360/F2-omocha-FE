import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      router.replace('/login'); // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [router]);
};

export default useRequireAuth;
