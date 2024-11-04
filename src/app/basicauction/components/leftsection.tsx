'use client';

import { useEffect } from 'react';

import { CheckIcon } from 'lucide-react';

import SearchBar from '@/app/basicauction/components/searchbar';
import useBooleanState from '@/hooks/useBooleanState';
import useSetSearchParams from '@/hooks/useSetSearchParam';
import { AUCTIONPARAM_KEY } from '@/static/queryParam';

import * as S from './LeftSection.css';

export default function LeftSection() {
  const { value: isChecked, toggle } = useBooleanState(false);
  const { setSingleSearchParam } = useSetSearchParams();

  useEffect(() => {
    if (isChecked) {
      setSingleSearchParam(AUCTIONPARAM_KEY.AUCTIONSTATUS, 'BIDDING');
    } else {
      setSingleSearchParam(AUCTIONPARAM_KEY.AUCTIONSTATUS, '');
    }
  }, [isChecked]);

  return (
    <section className={S.leftSection}>
      <SearchBar />
      <label htmlFor="checkbox" className={`${S.label} ${isChecked ? S.checked : S.nonChecked}`}>
        경매중
        <CheckIcon size={16} />
        <input id="checkbox" type="checkbox" className={S.checkbox} onChange={toggle} />
      </label>
    </section>
  );
}
