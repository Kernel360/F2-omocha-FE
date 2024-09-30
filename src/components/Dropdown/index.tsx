import React, { MouseEventHandler, useEffect, useRef } from 'react';

import useDisclosure from '@/hooks/useDisclosure';

import * as S from './Dropdown.css';

interface DropDownItemProps {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface DropDownProps {
  children: React.ReactNode;
}

interface DropDownTriggerProps {
  children: React.ReactNode;
}

interface DropDownContentProps {
  children: React.ReactNode;
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
        {items[0]}
      </div>
      {isOpen && items[1]}
    </div>
  );
}

Dropdown.Trigger = function DropdownTrigger({ children }: DropDownTriggerProps) {
  return <span>{children}</span>;
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
