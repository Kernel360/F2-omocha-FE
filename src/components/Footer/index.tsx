'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { MAIN_CATEGORY } from '@/static/category';

import MaxLayout from '../MaxLayout';

import * as S from './Footer.css';

function Footer() {
  const router = useRouter();
  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <footer className={S.footer}>
          <div className={S.topFooter}>
            <button
              className={S.logoButton}
              type="button"
              onClick={() => router.push('/', { scroll: false })}
            >
              OMOCHA
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
      </MaxLayout>
    </div>
  );
}

export default Footer;
