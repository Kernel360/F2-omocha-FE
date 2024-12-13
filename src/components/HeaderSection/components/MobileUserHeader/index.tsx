import { Suspense } from 'react';

import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import logoIcon from '@/assets/png/logo.png';
import SearchBar from '@/components/HeaderSection/components/SearchBar/searchbar';
import mixpanel from '@/lib/mixpanel';
import EVENT_ID from '@/static/eventId';
import colors from '@/styles/color';

import * as S from './MobileUserHeader.css';

interface MobileUserHeaderProps {
  openNav: () => void;
}

function MobileUserHeader({ openNav }: MobileUserHeaderProps) {
  const handleMixpanel = () => {
    mixpanel.track(EVENT_ID.MAIN_BUTTON_CLICKED);
  };

  return (
    <section className={S.topHeader}>
      <div className={S.IconWrapper}>
        <MenuIcon stroke={colors.gray10} onClick={openNav} />
        <Suspense fallback={<>SearchBar</>}>
          <SearchBar />
        </Suspense>
      </div>
      <Link href="/" scroll={false} className={S.topHeaderLogo} onClick={handleMixpanel}>
        <Image src={logoIcon} alt="logo" width={24} height={24} className={S.logo} priority />
        <div className={S.logo}>OMOCHA</div>
      </Link>
    </section>
  );
}

export default MobileUserHeader;
