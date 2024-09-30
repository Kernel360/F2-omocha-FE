'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useBooleanState from '@/hooks/useBooleanState';
import { MAIN_CATEGORY, SUB_CATEGORY, SubCategory } from '@/static/category';

import SlideSideNav from '../SlideSideNav';

import * as S from './Header.css';

function Header() {
  const pathname = usePathname();
  const { value, setTrue, setFalse } = useBooleanState(false);

  const headerItemAction = (headerItem: SubCategory) => {
    switch (headerItem.name) {
      case '알림':
        return (
          <button className={S.SideNavButton} type="button" key={headerItem.id} onClick={setTrue}>
            {headerItem.name}
          </button>
        );

      default:
        return (
          <Link key={headerItem.id} href={headerItem.path!}>
            {headerItem.name}
          </Link>
        );
    }
  };

  return (
    <header className={S.container}>
      <section className={S.topHeader}>
        <Link href="/">
          <div className={S.logo}>LOGO</div>
        </Link>
        <div className={S.topCategory}>
          {SUB_CATEGORY.map(category => headerItemAction(category))}
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
      {value && (
        <SlideSideNav value onClose={setFalse}>
          <div> test</div>
        </SlideSideNav>
      )}
    </header>
  );
}

export default Header;
