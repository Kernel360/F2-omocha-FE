import type { Meta, StoryObj } from '@storybook/react';

import AuctionInfo from '@/components/AuctionInfo';

const meta = {
  title: 'AuctionInfo',
  component: AuctionInfo,
} satisfies Meta<typeof AuctionInfo>;

export default meta;

type Story = StoryObj<typeof AuctionInfo>;

export const Default: Story = {};
