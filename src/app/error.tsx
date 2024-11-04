'use client';

// Error boundaries must be Client Components

import { startTransition, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import * as S from './globals.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={S.errorContainer}>
      <h2>예상치 못한 오류가 발생했습니다.</h2>
      <div className={S.errorButtons}>
        <button
          type="button"
          onClick={() => {
            // Attempt to recover by trying to re-render the segment
            startTransition(() => {
              router.refresh(); // 서버 컴포넌트 리렌더링
              reset(); // 클라이언트 컴포넌트 리렌더링
            });
          }}
          className={S.errorButton}
        >
          다시 시도하기
        </button>
        <button type="button" onClick={() => router.push('/')} className={S.errorButton}>
          메인으로 돌아가기
        </button>
        <button type="button" onClick={() => router.back()} className={S.errorButton}>
          이전으로 돌아가기
        </button>
      </div>
    </div>
  );
}
