import { useRef } from 'react';

import XIcon from '@/assets/svg/x.svg';
import Portal from '@/components/Portal';
import useOnClickOutside from '@/hooks/useOnClickOutside';

import * as S from './SlideSideNav.css';

interface SlideSideNavProps {
  onClose: () => void;
  children: React.ReactNode;
}

function SlideSideNav(Sample: SlideSideNavProps) {
  const { onClose, children } = Sample;

  const sideNavRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(sideNavRef, onClose);

  return (
    <Portal>
      <div className={S.overlay}>
        <div ref={sideNavRef} className={S.container}>
          <div className={S.titleSection}>
            <button type="button" onClick={onClose} className={S.xButton}>
              <XIcon />
            </button>
            <span className={S.title}>알림</span>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export default SlideSideNav;
