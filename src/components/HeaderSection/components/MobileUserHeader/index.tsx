import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import logoIcon from '@/assets/png/logo.png';
import SearchBar from '@/components/HeaderSection/components/SearchBar/searchbar';
import colors from '@/styles/color';

import * as S from './MobileUserHeader.css';

interface MobileUserHeaderProps {
  openNav: () => void;
}

function MobileUserHeader({ openNav }: MobileUserHeaderProps) {
  return (
    <section className={S.topHeader}>
      <div className={S.IconWrapper}>
        <MenuIcon stroke={colors.gray10} onClick={openNav} />
        <SearchBar />
      </div>
      <Link href="/" scroll={false} className={S.topHeaderLogo}>
        <Image width={24} height={24} src={logoIcon} alt="logo" className={S.logo} />
        <div className={S.logo}>OMOCHA</div>
      </Link>
    </section>
  );
}

export default MobileUserHeader;
