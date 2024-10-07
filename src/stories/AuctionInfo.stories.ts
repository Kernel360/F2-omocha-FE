import AuctionInfo from '@/components/AuctionInfo';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'AuctionInfo',
  component: AuctionInfo,
} satisfies Meta<typeof AuctionInfo>;

export default meta;

type Story = StoryObj<typeof AuctionInfo>;

export const Default: Story = {};
