'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { MAIN_CATEGORY } from '@/static/category';

import * as S from './Footer.css';

function Footer() {
  const router = useRouter();
  return (
    <div className={S.container}>
      <footer className={S.footer}>
        <div className={S.topFooter}>
          <button
            className={S.logoButton}
            type="button"
            onClick={() => router.push('/', { scroll: false })}
          >
            LOGO
          </button>
          <ul className={S.categoryList}>
            {MAIN_CATEGORY.map(category => (
              <li className={S.category} key={category.id}>
                <Link className={S.categoryLink} href={category.path} scroll={false}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={S.bottomFooter}>Copyright ⓒ Omocha. All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default Footer;
