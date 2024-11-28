'use client';

import { ChevronUpIcon } from 'lucide-react';

import useScrollToTop from '@/hooks/useScrollToTop';

import * as S from './ScrollToTopButton.css';

export default function ScrollToTopButton() {
  const { scrollToTop } = useScrollToTop();

  return (
    <button
      className={S.scrollButton}
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <ChevronUpIcon className={S.scrollButtonIcon} />
    </button>
  );
}
