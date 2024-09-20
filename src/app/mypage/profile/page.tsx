'use client';

import { MYPAGE_CATEGORY } from '@/static/category';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Home() {
  const pathname = usePathname();
  return (
    <div>
      <div>
        <ul>
          {MYPAGE_CATEGORY.map(category => (
            <li key={category.id}>
              <Link
                href={category.path}
                style={{ color: category.path === pathname ? 'red' : 'black' }}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
