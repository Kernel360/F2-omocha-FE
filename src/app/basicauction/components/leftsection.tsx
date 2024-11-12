import AuctionCategory from '@/components/AuctionCategory';

import * as S from './LeftSection.css';

export default async function LeftSection() {
  return (
    <section className={S.leftSection}>
      <AuctionCategory />
    </section>
  );
}
