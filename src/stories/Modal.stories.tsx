/* eslint-disable react/jsx-props-no-spreading */
import type { Meta, StoryObj } from '@storybook/react';

import { ModalProps, Modal } from '@/components/Modal';
import { useState } from 'react';

const meta = {
  title: 'Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

function Example(arg: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        모달 열기
      </button>
      {isOpen && <Modal {...arg} />}
    </div>
  );
}

export const Default: Story = {
  render: (arg: ModalProps) => <Example {...arg} />,
  args: {
    content: '이벤트가 시작되었습니다!',
    rightButton: '취소',
    leftButton: '확인',
    onClose: () => {},
    onEvent: () => {},
  },
};
