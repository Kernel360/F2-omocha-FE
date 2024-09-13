import type { Meta, StoryObj } from '@storybook/react';

import ItemCard from '@/components/ItemCard';

const meta = {
  title: 'ItemCard',
  component: ItemCard,
} satisfies Meta<typeof ItemCard>;

export default meta;

type Story = StoryObj<typeof ItemCard>;

export const Default: Story = {};
