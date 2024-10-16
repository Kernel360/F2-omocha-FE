/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import * as Popover from '@radix-ui/react-popover';

import useGetChatroomList from '@/apis/queryHooks/chat/useGetChatroomList';
import XIcon from '@/assets/svg/x.svg';

import * as S from './ChattingIconButton.css';
import ChattingList from './ChattingList';

function ChattingIconButton() {
  const { data } = useGetChatroomList({ pageable: 0 });

  if (!data) return null;

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
          <Popover.Close className={S.popoverClose} aria-label="Close">
            <XIcon />
          </Popover.Close>
          {/* <Popover.Arrow className={S.popoverArrow} /> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ChattingIconButton;
