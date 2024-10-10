import CheckIcon from '@/assets/svg/check.svg';
import useBooleanState from '@/hooks/useBooleanState';
import useSetSearchParam from '@/hooks/useSetSearchParam';
import { SEARCHPARAM_KEY } from '@/static/sort';

import * as S from './AuctionFilter.css';

export default function AuctionFilter() {
  const { value: isChecked, toggle } = useBooleanState(false);
  const { setSingleSearchParam } = useSetSearchParam();

  const handleFilter = () => {
    toggle();
    if (!isChecked) {
      setSingleSearchParam(SEARCHPARAM_KEY.AUCTIONSTATUS, 'BIDDING');
    } else {
      setSingleSearchParam(SEARCHPARAM_KEY.AUCTIONSTATUS, '');
    }
  };

  return (
    <label htmlFor="checkbox" className={`${S.label} ${isChecked ? S.checked : S.nonChecked}`}>
      경매중
      <CheckIcon />
      <input id="checkbox" type="checkbox" className={S.checkbox} onClick={handleFilter} />
    </label>
  );
}
