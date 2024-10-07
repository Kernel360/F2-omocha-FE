import ItemCard from '@/components/ItemCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ItemCard',
  component: ItemCard,
} satisfies Meta<typeof ItemCard>;

export default meta;

type Story = StoryObj<typeof ItemCard>;

export const Default: Story = {};
