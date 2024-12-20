'use client';

import MaxLayout from '@/components/MaxLayout';
import MypageCategory from '@/components/MypageCategory';
import MypageUserSection from '@/components/MypageUserSection';

import * as S from './Layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <ul className={S.categoryList}>
            <MypageUserSection />
            <MypageCategory />
          </ul>
          <div className={S.page}>{children}</div>
        </div>
      </MaxLayout>
    </div>
  );
}
