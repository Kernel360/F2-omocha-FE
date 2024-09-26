'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import * as S from '@/components/Header/Header.css';
import { MAIN_CATEGORY, SUB_CATEGORY } from '@/static/category';

function Header() {
  const pathname = usePathname();

  return (
    <div className={S.container}>
      <section className={S.topHeader}>
        <Link href="/">
          <div className={S.logo}>LOGO</div>
        </Link>
        <div className={S.topCategory}>
          {SUB_CATEGORY.map(category => (
            <Link
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
