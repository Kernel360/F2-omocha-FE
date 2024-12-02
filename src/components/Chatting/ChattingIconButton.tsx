'use client';

import * as Popover from '@radix-ui/react-popover';

import ChatIcon from '@/assets/svg/chat.svg';
import { useAuth } from '@/provider/authProvider';

import * as S from './ChattingIconButton.css';
import ChattingList from './ChattingList';
import { useState } from 'react';

function ChattingIconButton() {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!isLoggedIn) return null;

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button type="button" className={S.iconButton} aria-label="Update dimensions">
          <ChatIcon className={S.chatIcon} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={S.popoverContent}
          sideOffset={15}
          onPointerDownOutside={e => {
            e.preventDefault();
          }}
        >
          <ChattingList onClose={() => setIsOpen(false)} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ChattingIconButton;
