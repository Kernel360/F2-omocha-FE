'use client';

import * as S from '@/components/MainHeader/MainHeader.css';
import { MAIN_CATEGORY, SUB_CATEGORY } from '@/static/category';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function MainHeader() {
  const pathname = usePathname();

  return (
    <div className={S.container}>
      <section className={S.topHeader}>
        <h1>LOGO</h1>
        <div className={S.topCategory}>
          {SUB_CATEGORY.map(category => (
            <Link
              className={S.categoryLink}
              key={category.id}
              href={category.path}
              style={{ color: category.path === pathname ? 'red' : 'black' }}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
      <section className={S.bottomHeader}>
        {MAIN_CATEGORY.map(category => (
          <Link
            className={S.categoryLink}
            key={category.id}
            href={category.path}
            style={{ color: category.path === pathname ? 'red' : 'black' }}
          >
            {category.name}
          </Link>
        ))}
      </section>
    </div>
  );
}

export default MainHeader;
