'use client';

import * as S from '@/components/Footer/Footer.css';
import { MAIN_CATEGORY } from '@/static/category';
import Link from 'next/link';

function Footer() {
  return (
    <div className={S.container}>
      <div className={S.topFooter}>
        <h2>LOGO</h2>
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
  );
}

export default Footer;
