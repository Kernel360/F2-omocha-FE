import { keyframes, style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const skeleton = keyframes({
  '0%': { opacity: '1' },
  '50%': { opacity: '0.5' },
  '100%': { opacity: '1' },
});

const skeletonAnimation = `${skeleton} 1.5s ease-in-out infinite`;

const skeletonBase = style({
  backgroundColor: colors.gray6,
  animation: skeletonAnimation,
});

export const skeletonStyle = styleVariants({
  circle: [skeletonBase, { borderRadius: '50%' }],
  text: [skeletonBase, { height: '16px', width: '100%', borderRadius: '4px' }],
  card: [skeletonBase, { borderRadius: '12px' }],
});
