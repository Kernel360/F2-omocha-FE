import { useRouter, useSearchParams } from 'next/navigation';

import DeleteIcon from '@/assets/svg/delete.svg';
import SearchIcon from '@/assets/svg/search.svg';
import { AUCTIONPARAM_KEY } from '@/static/queryParam';

import * as S from './SearchBar.css';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchKeywordParam = searchParams.get(AUCTIONPARAM_KEY.Q);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼의 기본 동작 방지
    const formData = new FormData(e.currentTarget);
    const currentSearch = formData.get('searchKeyword') as string;

    router.push(`/basicauction?${AUCTIONPARAM_KEY.Q}=${currentSearch}`);
  };

  const deleteSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
    if (input) {
      input.value = '';
      input.focus();
    }
  };

  return (
    <form className={S.searchBar} onSubmit={onSubmit}>
      <button type="submit">
        <SearchIcon />
      </button>
      <input
        className={S.searchInput}
        name="searchKeyword"
        defaultValue={searchKeywordParam || ''}
        placeholder="경매 검색"
      />
      <button className={S.searchDelete} type="button" onClick={deleteSearch}>
        <DeleteIcon />
      </button>
    </form>
  );
}
