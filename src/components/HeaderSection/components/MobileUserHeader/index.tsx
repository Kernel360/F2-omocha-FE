import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import SearchBar from '@/app/basicauction/components/searchbar';
import logoIcon from '@/assets/png/logo.png';
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
        <Image width={30} height={30} src={logoIcon} alt="logo" className={S.logo} />
        <div className={S.logo}>OMOCHA</div>
      </Link>
    </section>
  );
}

export default MobileUserHeader;
