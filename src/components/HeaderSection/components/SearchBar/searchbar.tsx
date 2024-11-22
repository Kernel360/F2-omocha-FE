'use client';

import { CircleXIcon, SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { AUCTIONPARAM_KEY } from '@/static/queryParam';

import * as S from './Serachbar.css';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchKeywordParam = searchParams.get(AUCTIONPARAM_KEY.Q);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼의 기본 동작 방지
    const formData = new FormData(e.currentTarget);
    const currentSearch = formData.get('searchKeyword') as string;

    router.push(`/basicauction?${AUCTIONPARAM_KEY.Q}=${currentSearch}`, { scroll: false });
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
      <button type="submit" className={S.buttonIcon.search}>
        <SearchIcon size={16} />
      </button>
      <input
        className={S.searchInput}
        name="searchKeyword"
        defaultValue={searchKeywordParam || ''}
        placeholder="경매 검색"
      />
      <button className={S.buttonIcon.delete} type="button" onClick={deleteSearch}>
        <CircleXIcon size={16} />
      </button>
    </form>
  );
}
