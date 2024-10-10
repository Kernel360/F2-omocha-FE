import { Dropdown } from '@/components/Dropdown';
import useSetSearchParam from '@/hooks/useSetSearchParam';
import { SEARCHPARAM_KEY, SORT_VALUE, SORT_TYPES } from '@/static/sort';

export default function AuctionDropDown() {
  const [searchParams, setSearchParam] = useSetSearchParam();
  const currentSort = searchParams.get(SEARCHPARAM_KEY.SORT) || SORT_VALUE.CREATEDAT_DESC;
  const findSortType = SORT_TYPES.find(sortType => sortType.searchParamValue === currentSort);

  return (
    <Dropdown>
      <Dropdown.Trigger>{findSortType?.label}</Dropdown.Trigger>
      <Dropdown.Content>
        {SORT_TYPES.map(sortType => (
          <Dropdown.Item
            key={sortType.id}
            onClick={() => setSearchParam(sortType.searchParamKey, sortType.searchParamValue)}
          >
            {sortType.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
