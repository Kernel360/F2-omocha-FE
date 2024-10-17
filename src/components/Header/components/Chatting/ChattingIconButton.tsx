'use client';

import * as Popover from '@radix-ui/react-popover';

import * as S from './ChattingIconButton.css';
import ChattingList from './ChattingList';

function ChattingIconButton() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" className={S.iconButton} aria-label="Update dimensions" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={S.popoverContent}
          sideOffset={15}
          onPointerDownOutside={e => {
            e.preventDefault();
          }}
        >
          <ChattingList />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ChattingIconButton;
