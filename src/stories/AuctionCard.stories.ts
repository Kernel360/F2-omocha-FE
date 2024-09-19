import type { Meta, StoryObj } from '@storybook/react';

import AuctionCard from '@/components/AuctionCard';

const meta = {
  title: 'AuctionCard',
  component: AuctionCard,
} satisfies Meta<typeof AuctionCard>;

export default meta;

type Story = StoryObj<typeof AuctionCard>;

export const Default: Story = {};
