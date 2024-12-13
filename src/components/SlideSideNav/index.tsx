import { useRef } from 'react';

import { XIcon } from 'lucide-react';

import Portal from '@/components/Portal';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import colors from '@/styles/color';

import * as S from './SlideSideNav.css';

interface SlideSideNavProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type?: 'normal' | 'mobile' | 'right';
}

function SlideSideNav(Sample: SlideSideNavProps) {
  const { isOpen, onClose, children, type = 'normal' } = Sample;

  const sideNavRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(sideNavRef, onClose, 'mousedown');

  if (!isOpen) return null;

  return (
    <Portal>
      <div className={S.overlay}>
        <div ref={sideNavRef} className={S.container({ type })}>
          <div className={S.titleSection({ type })}>
            <button type="button" onClick={onClose} className={S.xButton}>
              <XIcon stroke={colors.gray10} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export default SlideSideNav;
