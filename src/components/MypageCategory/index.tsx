'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import mixpanel from '@/lib/mixpanel';
import { MYPAGE_CATEGORY } from '@/static/category';
import colors from '@/styles/color';

import * as S from './MypageCategory.css';

function MypageCategory() {
  const { data: user } = useGetUser();
  const pathname = usePathname();

  const handleMixpanel = (eventId: string) => {
    mixpanel.track(eventId);
  };

  return MYPAGE_CATEGORY.map(category => {
    if (category.path === '/mypage/heart') {
      return (
        <li key={category.id}>
          <Link
            className={S.categoryLink}
            href={category.path}
            style={{ color: category.path === pathname ? colors.primary9 : 'black' }}
            scroll={false}
            onClick={() => handleMixpanel(category.eventId)}
          >
            <span>{category.name}</span>
            <span className={S.likeCount}>{user?.like_count}</span>
          </Link>
        </li>
      );
    }
    return (
      <li key={category.id}>
        <Link
          className={S.categoryLink}
          href={category.path}
          style={{ color: category.path === pathname ? colors.primary9 : 'black' }}
          scroll={false}
          onClick={() => handleMixpanel(category.eventId)}
        >
          {category.name}
        </Link>
      </li>
    );
  });
}

export default MypageCategory;
