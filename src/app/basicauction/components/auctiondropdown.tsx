import { Dropdown } from '@/components/Dropdown';
import useSetSearchParam from '@/hooks/useSetSearchParam';
import { SEARCHPARAM_KEY, SORT_TYPES, SortTypeProps } from '@/static/sort';

export default function AuctionDropDown() {
  const { searchParams, setMultipleSearchParams } = useSetSearchParam();
  const currentSort = searchParams.get(SEARCHPARAM_KEY.SORT) || 'CREATEDAT';
  const currentDirection = searchParams.get(SEARCHPARAM_KEY.DIRECTION) || 'DESC';

  const findSortType = SORT_TYPES.find(
    sortType =>
      sortType.searchParams[SEARCHPARAM_KEY.SORT] === currentSort &&
      sortType.searchParams[SEARCHPARAM_KEY.DIRECTION] === currentDirection,
  );

  const handleSortType = (sortType: SortTypeProps) => {
    const newParams = {
      [SEARCHPARAM_KEY.SORT]: sortType.searchParams[SEARCHPARAM_KEY.SORT],
      [SEARCHPARAM_KEY.DIRECTION]: sortType.searchParams[SEARCHPARAM_KEY.DIRECTION],
    };

    setMultipleSearchParams(newParams);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>{findSortType?.label}</Dropdown.Trigger>
      <Dropdown.Content>
        {SORT_TYPES.map(sortType => (
          <Dropdown.Item key={sortType.id} onClick={() => handleSortType(sortType)}>
            {sortType.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
