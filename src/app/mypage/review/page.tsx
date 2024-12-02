import TabsLayout from '@/components/TabsLayout';

import * as S from './Review.css';
import ReceivedReview from './components/ReceivedReview';
import WrittenReview from './components/WrittenReview';

const TABS = [
  {
    title: '작성한 리뷰',
    value: 'written-reviews',
  },
  {
    title: '받은 리뷰',
    value: 'received-reviews',
  },
];

const TABS_CONTENT = [
  <WrittenReview key="written-reviews" />,
  <ReceivedReview key="received-reviews" />,
];

function Review() {
  return (
    <div className={S.review}>
      <h1 className={S.reviewTitle}>리뷰 내역</h1>
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

export default Review;
