import BasicBid from '@/app/mypage/record/components/basicbid';
import BasicSold from '@/app/mypage/record/components/basicsold';
import TabsLayout from '@/components/TabsLayout';

import * as S from './Record.css';

const TABS = [
  {
    title: '입찰 내역',
    value: 'basicBid',
  },
  {
    title: '판매 내역',
    value: 'basicSold',
  },
];

const TABS_CONTENT = [<BasicBid key="basicBid" />, <BasicSold key="basicSold" />];

function Home() {
  return (
    <div className={S.record}>
      <h3>거래 내역</h3>
      <section className={S.section}>
        <TabsLayout
          defaultTriggerValue={TABS[0].value}
          triggerTitleList={TABS}
          childrenList={TABS_CONTENT}
        />
      </section>
    </div>
  );
}

export default Home;
