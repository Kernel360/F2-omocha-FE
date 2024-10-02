/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';

import { ModalProps, Modal } from '@/components/Modal';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

function Example(arg: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        모달 열기
      </button>
      <Modal {...arg} isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
        <div>
          <div>현재 준비 중인 이벤트입니다.</div>
          <span>
            <button type="button">왼쪽 버튼</button>
            <button type="button">오른쪽 버튼</button>
          </span>
        </div>
      </Modal>
    </div>
  );
}

export const Default: Story = {
  render: (arg: ModalProps) => <Example {...arg} />,
};
