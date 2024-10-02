'use client';

import { useState } from 'react';

import { Dropdown } from '@/components/Dropdown';

export default function AuctionDropDown() {
  const [selected, setSelected] = useState('최신순');

  return (
    <Dropdown>
      <Dropdown.Trigger>{selected}</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item onClick={() => setSelected('최신순')}>최신순</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelected('현재가순')}>현재가순</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelected('경매중')}>경매중</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
