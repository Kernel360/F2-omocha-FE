'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import * as S from '@/components/Footer/Footer.css';
import { MAIN_CATEGORY } from '@/static/category';

function Footer() {
  const router = useRouter();
  return (
    <footer className={S.footer}>
      <div className={S.container}>
        <div className={S.topFooter}>
          <button className={S.logoButton} type="button" onClick={() => router.push('/')}>
            LOGO
          </button>
          <ul className={S.categoryList}>
            {MAIN_CATEGORY.map(category => (
              <li className={S.category} key={category.id}>
                <Link className={S.categoryLink} href={category.path}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={S.bottomFooter}>Copyright ⓒ Omocha. All Rights Reserved</div>
      </div>
    </footer>
  );
}

export default Footer;
