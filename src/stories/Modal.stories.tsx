/* eslint-disable react/jsx-props-no-spreading */

import { Modal } from '@/components/Modal/Modal';
import ModalFooter from '@/components/Modal/ModalFooter';
import ModalHeaderFooter from '@/components/Modal/ModalHeaderFooter';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;
type StoryFooter = StoryObj<typeof ModalFooter>;
type StoryHeaderFooter = StoryObj<typeof ModalHeaderFooter>;

const sampleContext = <div>모달 내용인데 정말 중요한 모달 내용입니다.</div>;

export const Default: Story = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
    children: sampleContext,
  },
  render: args => <Modal {...args} />,
};

export const ModalWithFooter: StoryFooter = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
    children: sampleContext,
    positiveButton: '확인',
    negativeButton: '취소',
    positiveButtonEvent: () => {},
  },
  render: args => <ModalFooter {...args} />,
};

export const ModalWithHeaderFooter: StoryHeaderFooter = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
    children: sampleContext,
    title: '제목',
    positiveButton: '확인',
    negativeButton: '취소',
    positiveButtonEvent: () => {},
  },
  render: args => <ModalHeaderFooter {...args} />,
};
