import React, { MouseEventHandler, useEffect, useRef } from 'react';

import ChevronDownIcon from '@/assets/svg/chevron-down.svg';
import ChevronUpIcon from '@/assets/svg/chevron-up.svg';
import useDisclosure from '@/hooks/useDisclosure';

import * as S from './Dropdown.css';

interface DropDownProps {
  children: React.ReactNode;
}

interface DropDownTriggerProps {
  children: React.ReactNode;
  isOpen: boolean;
}

interface DropDownContentProps {
  children: React.ReactNode;
}

interface DropDownItemProps {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function Dropdown({ children }: DropDownProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const triggerRef = useRef<HTMLDivElement>(null);
  const items = React.Children.toArray(children);

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      const isInsideClick =
        triggerRef.current && e.target instanceof Element && triggerRef.current.contains(e.target);
      if (!isInsideClick) {
        onClose();
      }
    };

    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [onClose]);
  return (
    <div>
      <div
        className={S.dropdownData}
        aria-hidden="true"
        role="button"
        ref={triggerRef}
        onClick={onToggle}
      >
        {React.cloneElement(items[0] as React.ReactElement, { isOpen })}
      </div>
      {isOpen && items[1]}
    </div>
  );
}

Dropdown.Trigger = function DropdownTrigger({ children, isOpen }: DropDownTriggerProps) {
  return (
    <span className={S.dropdownTrigger}>
      {children}
      <span style={{ pointerEvents: 'none' }}>
        {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </span>
    </span>
  );
};

Dropdown.Content = function DropdownContent({ children }: DropDownContentProps) {
  return <div className={S.dropdownContent}>{children}</div>;
};

Dropdown.Item = function DropdownItem({ children, onClick }: DropDownItemProps) {
  return (
    <div className={S.dropdownItem}>
      <button className={S.dropdownText} type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
