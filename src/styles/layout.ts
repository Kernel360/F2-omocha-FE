const maxLayoutWidth = {
  maxWidth: '1000px',
  padding: '0px 20px',
};

const spacing = {
  step1: '4px',
  step2: '8px',
  step3: '12px',
  step4: '16px',
  step5: '24px',
  step6: '32px',
  step7: '40px',
  step8: '48px',
  step9: '64px',
};

const minHeight = 'calc(100vh - 219px)';

const minMobileHeight = 'calc(100vh - 219px)';

const layout = {
  maxLayoutWidth,
  minHeight,
  minMobileHeight,
  ...spacing,
};
export default layout;
