'use client';

import { CalendarClock } from 'lucide-react';

import * as S from './SpecialSection.css';
import SpecialSectionData from './SpecialSectionData';

function SpecialSection() {
  return (
    <div className={S.specialSection}>
      <div className={S.specialSectionTitle}>
        <div className={S.flex}>
          <span className={S.only}>현재</span>
          <CalendarClock size={24} />
        </div>
        <span className={S.popularItem}>인기 경매</span>
      </div>
      <SpecialSectionData />
    </div>
  );
}

export default SpecialSection;
