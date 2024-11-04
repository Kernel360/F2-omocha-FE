'use client';

import React, { MouseEventHandler, useRef } from 'react';

import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

import useDisclosure from '@/hooks/useDisclosure';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface DropDownProps {
  children: React.ReactNode;
  className?: string;
}

interface DropDownTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface DropDownContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DropDownItemProps {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export function Dropdown({ children, className }: DropDownProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const triggerRef = useRef<HTMLDivElement>(null);
  const items = React.Children.toArray(children);

  useOnClickOutside(triggerRef, onClose, 'click');

  return (
    <>
      <div
        className={className}
        aria-hidden="true"
        role="button"
        ref={triggerRef}
        onClick={onToggle}
      >
        {items[0]}
        <span style={{ pointerEvents: 'none', display: 'flex' }}>
          {isOpen ? (
            <ChevronDownIcon width={16} height={16} />
          ) : (
            <ChevronUpIcon width={16} height={16} />
          )}
        </span>
      </div>
      {isOpen && items[1]}
    </>
  );
}

Dropdown.Trigger = function DropdownTrigger({ children, className }: DropDownTriggerProps) {
  return <span className={className}>{children}</span>;
};

Dropdown.Content = function DropdownContent({ children, className }: DropDownContentProps) {
  return <div className={className}>{children}</div>;
};

Dropdown.Item = function DropdownItem({ children, onClick, className }: DropDownItemProps) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
