const fontSize = {
  h1: '32px',
  h2: '28px',
  h3: '24px',
  h4: '20px',
  bodyLarge: '16px',
  body: '14px',
  caption: '12px',
};

// Font Weight
const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
};

// Line Height
const lineHeight = {
  h1: '44px',
  h2: '38px',
  h3: '32px',
  h4: '28px',
  bodyLarge: '24px',
  body: '20px',
  caption: '16px',
};

// Typography
const typography = {
  h1: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.h1,
  },
  h2: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.h2,
  },
  h3: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.h3,
  },
  h4: {
    fontSize: fontSize.h4,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.h4,
  },
  bodyLarge: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.bodyLarge,
  },
  bodyBold: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.body,
  },
  body: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.body,
  },
  caption: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.caption,
  },
};

export default typography;
