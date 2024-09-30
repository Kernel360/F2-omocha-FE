'use client';

import { useEffect, useState } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import DeleteIcon from '@/assets/svg/delete.svg';
import SearchIcon from '@/assets/svg/search.svg';

import * as S from './Basicauction.css';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const q = searchParams.get('q');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || search === q) return;
    router.push(`/basicauction?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={S.searchBar}>
      <button type="button" onClick={onSubmit}>
        <SearchIcon />
      </button>
      <input
        className={S.searchInput}
        value={search}
        placeholder="경매 검색"
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      {search.length > 0 && (
        <button className={S.searchDelete} type="button" onClick={() => setSearch('')}>
          <DeleteIcon />
        </button>
      )}
    </div>
  );
}
