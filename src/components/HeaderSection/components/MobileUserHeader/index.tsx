import { Suspense } from 'react';

import { BellIcon, MenuIcon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import logoIcon from '@/assets/png/logo.png';
import SearchBar from '@/components/HeaderSection/components/SearchBar/searchbar';
import SlideSideNav from '@/components/SlideSideNav';
import useBooleanState from '@/hooks/useBooleanState';
import mixpanel from '@/lib/mixpanel';
import { useAuth } from '@/provider/authProvider';
import { useSSE } from '@/provider/sseProvider';
import EVENT_ID from '@/static/eventId';
import colors from '@/styles/color';

import Alarm from '../Alarm';

import * as S from './MobileUserHeader.css';

interface MobileUserHeaderProps {
  openNav: () => void;
}

function MobileUserHeader({ openNav }: MobileUserHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    value: searchOpen,
    setTrue: setSearchOpen,
    setFalse: setSearchClose,
  } = useBooleanState(false);
  const {
    value: alarmOpen,
    setTrue: setAlarmOpen,
    setFalse: setAlarmClose,
  } = useBooleanState(false);
  const { isLoggedIn } = useAuth();
  const { noticeList } = useSSE();

  const handleMixpanel = (eventId: string, prevEvent?: string) => {
    if (!isLoggedIn) {
      mixpanel.track(EVENT_ID.REDIRECT_TO_LOGIN_PAGE_VIEWED, {
        prev_event: prevEvent,
      });
      return;
    }
    mixpanel.track(eventId);
  };

  return (
    <section className={S.topHeader}>
      <div className={S.IconWrapper}>
        <MenuIcon stroke={colors.gray10} onClick={openNav} />
        <div className={S.searchAlarmWrapper}>
          <button type="button" onClick={() => setSearchOpen()}>
            <SearchIcon size="16" />
          </button>
          {isLoggedIn ? (
            <button
              type="button"
              className={S.alarm}
              onClick={() => {
                setAlarmOpen();
                handleMixpanel(EVENT_ID.ALARM_BUTTON_CLICKED);
              }}
            >
              <BellIcon size="16" />
              {noticeList.length > 0 && <span className={S.alarmDot} />}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                router.push(
                  searchParams.size > 0
                    ? `/login?prevUrl=${pathname}?${searchParams}`
                    : `/login?prevUrl=${pathname}`,
                  { scroll: false },
                );
                handleMixpanel(EVENT_ID.REDIRECT_TO_LOGIN_PAGE_VIEWED, '알림');
              }}
            >
              <BellIcon size="16" />
            </button>
          )}
        </div>
      </div>
      <Link
        href="/"
        scroll={false}
        className={S.topHeaderLogo}
        onClick={() => mixpanel.track(EVENT_ID.MAIN_BUTTON_CLICKED)}
      >
        <Image src={logoIcon} alt="logo" width={24} height={24} className={S.logo} priority />
        <div className={S.logo}>OMOCHA</div>
      </Link>
      <SlideSideNav isOpen={searchOpen} onClose={setSearchClose} type="rightMobile">
        <Suspense fallback={<>SearchBar</>}>
          <SearchBar />
        </Suspense>
      </SlideSideNav>
      <SlideSideNav isOpen={alarmOpen} onClose={setAlarmClose} type="rightMobile">
        <Alarm />
      </SlideSideNav>
    </section>
  );
}

export default MobileUserHeader;
