'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchIcon from '@/assets/svg/search.svg';
import * as S from '@/app/basicauction/Basicauction.css';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const q = searchParams.get('search');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/basicauction?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={S.searchBar}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button type="button" onClick={onSubmit}>
        <SearchIcon />
      </button>
    </div>
  );
}
