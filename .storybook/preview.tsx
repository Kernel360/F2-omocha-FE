import type { Preview } from '@storybook/react';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <div>
        <Story />
        <div id="root-portal" />
      </div>
    ),
  ],
};

export default preview;
