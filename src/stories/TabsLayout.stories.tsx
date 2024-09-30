import TabsLayout from '@/components/TabsLayout';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TabsLayout> = {
  title: 'TabsLayout',
  component: TabsLayout,
  argTypes: {
    triggerTitleList: { control: 'object' },
    childrenList: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof TabsLayout>;

export const Default: Story = {
  args: {
    defaultTriggerValue: 'account',
    triggerTitleList: [
      { title: 'Account', value: 'account' },
      { title: 'Settings', value: 'settings' },
      { title: 'Profile', value: 'profile' },
    ],
    childrenList: [
      <div key="account">Account Content</div>,
      <div key="settings">Settings Content</div>,
      <div key="profile">Profile Content</div>,
    ],
  },
};
