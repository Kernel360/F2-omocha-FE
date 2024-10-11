import React, { MouseEventHandler, useRef } from 'react';

import ChevronDownIcon from '@/assets/svg/chevron-down.svg';
import ChevronUpIcon from '@/assets/svg/chevron-up.svg';
import useDisclosure from '@/hooks/useDisclosure';
import useOnClickOutside from '@/hooks/useOnClickOutside';

import * as S from './Dropdown.css';

interface DropDownProps {
  children: React.ReactNode;
}

interface DropDownTriggerProps {
  children: React.ReactNode;
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

  useOnClickOutside(triggerRef, onClose, 'click');

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
        <span style={{ pointerEvents: 'none' }}>
          {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}{' '}
        </span>
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
