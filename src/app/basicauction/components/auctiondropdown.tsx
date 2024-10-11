import { Dropdown } from '@/components/Dropdown';
import useSetSearchParam from '@/hooks/useSetSearchParam';
import { AUCTIONPARAM_KEY, AUCTIONPARAM_VALUE } from '@/static/queryParam';
import { SORT_TYPES, SortTypeProps } from '@/static/sort';

export default function AuctionDropDown() {
  const { searchParams, setMultipleSearchParams } = useSetSearchParam();
  const currentSort = searchParams.get(AUCTIONPARAM_KEY.SORT) || AUCTIONPARAM_VALUE.CREATEDAT;
  const currentDirection = searchParams.get(AUCTIONPARAM_KEY.DIRECTION) || 'DESC';

  const findSortType =
    SORT_TYPES.find(
      sortType =>
        sortType.searchParams[AUCTIONPARAM_KEY.SORT] === currentSort &&
        sortType.searchParams[AUCTIONPARAM_KEY.DIRECTION] === currentDirection,
    ) || SORT_TYPES[0];

  const handleSortType = (sortType: SortTypeProps) => {
    const newParams = {
      [AUCTIONPARAM_KEY.SORT]: sortType.searchParams[AUCTIONPARAM_KEY.SORT],
      [AUCTIONPARAM_KEY.DIRECTION]: sortType.searchParams[AUCTIONPARAM_KEY.DIRECTION],
    };

    setMultipleSearchParams(newParams);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>{findSortType.label}</Dropdown.Trigger>
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
