'use client';

import { useEffect } from 'react';

import { CheckIcon } from 'lucide-react';

import useBooleanState from '@/hooks/useBooleanState';
import useSetSearchParams from '@/hooks/useSetSearchParam';
import { AUCTIONPARAM_KEY } from '@/static/queryParam';

import * as S from './Checkbox.css';

function Checkbox() {
  const { value: isChecked, toggle } = useBooleanState(false);
  const { setSingleSearchParam } = useSetSearchParams();

  useEffect(() => {
    setSingleSearchParam(AUCTIONPARAM_KEY.AUCTIONSTATUS, isChecked ? 'BIDDING' : '');
  }, [isChecked]);

  return (
    <label htmlFor="checkbox" className={`${S.label} ${isChecked ? S.checked : S.nonChecked}`}>
      경매중
      <CheckIcon size={16} />
      <input id="checkbox" type="checkbox" className={S.checkbox} onChange={toggle} />
    </label>
  );
}

export default Checkbox;
