'use client';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import BasicHeart from '@/app/mypage/heart/components/basicheart';
import LiveHeart from '@/app/mypage/heart/components/liveheart';
import TabsLayout from '@/components/TabsLayout';

import * as S from './Heart.css';

const TABS = [
  {
    title: '일반 경매',
    value: 'basicHeart',
  },
  {
    title: '라이브 경매',
    value: 'liveHeart',
  },
];

const TABS_CONTENT = [<BasicHeart key="basicHeart" />, <LiveHeart key="liveHeart" />];

function Home() {
  const user = useGetUser();

  return (
    <div className={S.heart}>
      <h2>찜 ({user.data?.member_id})</h2>
      <TabsLayout
        defaultTriggerValue={TABS[0].value}
        triggerTitleList={TABS}
        childrenList={TABS_CONTENT}
      />
    </div>
  );
}

export default Home;
