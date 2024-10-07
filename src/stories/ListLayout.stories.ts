import ListLayout from '@/components/ListLayout';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ListLayout',
  component: ListLayout,
} satisfies Meta<typeof ListLayout>;

export default meta;

type Story = StoryObj<typeof ListLayout>;

export const Default: Story = {};
