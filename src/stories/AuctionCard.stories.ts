import AuctionCard from '@/components/AuctionCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'AuctionCard',
  component: AuctionCard,
} satisfies Meta<typeof AuctionCard>;

export default meta;

type Story = StoryObj<typeof AuctionCard>;

export const Default: Story = {};
