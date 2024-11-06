import Checkbox from '@/app/basicauction/components/checkbox';
import SearchBar from '@/app/basicauction/components/searchbar';

import * as S from './LeftSection.css';

export default function LeftSection() {
  return (
    <section className={S.leftSection}>
      <SearchBar />
      <Checkbox />
    </section>
  );
}
