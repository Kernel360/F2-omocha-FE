import React, { ReactNode } from 'react';

import * as S from './MaxLayout.css';

function MaxLayout({ children }: { children: ReactNode }) {
  return <div className={S.container}>{children}</div>;
}

export default MaxLayout;
