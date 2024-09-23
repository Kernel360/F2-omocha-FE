'use client';

import { MAIN_CATEGORY, SUB_CATEGORY } from '@/static/category';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as S from '@/components/Header/Header.css';

function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={S.container}>
      <section className={S.topHeader}>
        <button className={S.logoButton} type="button" onClick={() => router.push('/')}>
          LOGO
        </button>
        <div className={S.topCategory}>
          {SUB_CATEGORY.map(category => (
            <Link className={S.categoryLink} key={category.id} href={category.path}>
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

export default Header;
