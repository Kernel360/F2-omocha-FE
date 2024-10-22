'use client';

import { useEffect, useState } from 'react';

import ChevronUpIcon from '@/assets/svg/chevron-up.svg';
import useScrollToTop from '@/hooks/useScrollToTop';

import * as S from './ScrollToTopButton.css';

export default function ScrollToTopButton() {
  const { scrollToTop } = useScrollToTop();
  const [showButton, setShowButton] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        const timeout = setTimeout(() => {
          setShowButton(false);
        }, 800);
        setScrollTimeout(timeout);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  return (
    <button
      className={`${S.scrollButton} ${showButton ? S.showButton : S.hideButton}`}
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <ChevronUpIcon />
    </button>
  );
}
