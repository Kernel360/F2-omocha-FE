'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BasicAuctionIcon from '@/assets/svg/basicauction.svg';
import LiveAuctionIcon from '@/assets/svg/liveauction.svg';
import ModalFooter from '@/components/Modal/ModalFooter';
import useBooleanState from '@/hooks/useBooleanState';

import * as S from './Create.css';

export default function Home() {
  const { value: isOpen, setValue: setIsOpen } = useBooleanState(false);
  const router = useRouter();
  const isActive = true;

  return (
    <div className={S.container}>
      <div className={S.containerBox}>
        <Link className={S.categoryLink} href="/create/basicauction">
          <div className={S.title}>일반 경매</div>
          <div>
            <BasicAuctionIcon />
          </div>
          <div className={S.description}>
            일반 경매는 정해진 기간 내에 경매를 진행합니다. 낙찰 이후에 구매자와 판매자는 1:1 채팅이
            자동으로 연동됩니다.
          </div>
        </Link>
      </div>
      <div className={S.containerBox}>
        <button type="button" className={S.categoryLink} onClick={() => setIsOpen(true)}>
          {isActive && <div className={S.dim}>준비중입니다.</div>}
          <div className={S.title}>라이브 경매</div>
          <div>
            <LiveAuctionIcon />
          </div>
          <div className={S.description}>
            라이브 경매는 라이브 채팅이 포함된 경매입니다. 판매자는 경매 기간 동안 채팅을 통해
            구매자들과 소통할 수 있습니다. 낙찰 이후에는 구매자와 1:1 채팅이 자동으로 연동됩니다.
          </div>
        </button>
        <ModalFooter
          isOpen={isOpen}
          onOpenChange={open => setIsOpen(open)}
          positiveButton="일반 경매로 이동"
          positiveButtonEvent={() => router.push('/create/basicauction')}
        >
          현재 준비중입니다. 일반 경매를 이용해 주세요.
        </ModalFooter>
      </div>
    </div>
  );
}
