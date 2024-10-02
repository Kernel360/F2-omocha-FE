'use client';

import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import DeleteIcon from '@/assets/svg/delete.svg';
import SearchIcon from '@/assets/svg/search.svg';

import * as S from './SearchBar.css';

export default function SearchBar() {
  const router = useRouter();

  const searchRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const currentSearch = searchRef.current?.value || '';

    // if (currentSearch === searchKeyword) return;
    // setSearchKeyword(currentSearch);
    router.push(`/basicauction?q=${currentSearch}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const deleteSearch = () => {
    if (searchRef.current) {
      searchRef.current.value = '';
      searchRef.current.focus();
    }
  };

  return (
    <div className={S.searchBar}>
      <button type="button" onClick={onSubmit}>
        <SearchIcon />
      </button>
      <input
        ref={searchRef}
        className={S.searchInput}
        defaultValue=""
        placeholder="경매 검색"
        onKeyDown={onKeyDown}
      />
      {/* {searchRef.current != null && ( */}
      <button className={S.searchDelete} type="button" onClick={deleteSearch}>
        <DeleteIcon />
      </button>
      {/* )} */}
    </div>
  );
}
