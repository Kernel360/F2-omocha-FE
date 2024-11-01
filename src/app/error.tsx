'use client';

// Error boundaries must be Client Components

import { useEffect } from 'react';

import * as S from './globals.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={S.errorContainer}>
      <h2>예상치 못한 오류가 발생했습니다.</h2>
      <button
        type="button"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className={S.errorButton}
      >
        다시 시도
      </button>
    </div>
  );
}
