import type { Meta, StoryObj } from '@storybook/react';

import ListLayout from '@/components/ListLayout';

const meta = {
  title: 'ListLayout',
  component: ListLayout,
} satisfies Meta<typeof ListLayout>;

export default meta;

type Story = StoryObj<typeof ListLayout>;

export const Default: Story = {};
