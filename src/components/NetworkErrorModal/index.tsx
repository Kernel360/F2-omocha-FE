'use client';

import { LoaderIcon } from 'lucide-react';

import useNetworkStatus from '@/hooks/useNetworkStatus';
import { useToast } from '@/provider/toastProvider';

import * as S from './NetworkErrorModal.css';

function NetworkErrorModal({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const isOnline = useNetworkStatus({
    onOnline: () => showToast('success', '네트워크가 연결되었습니다.'),
    onOffline: () => showToast('error', '네트워크 연결이 끊겼습니다. 다시 시도해주세요.'),
  });

  return (
    <div>
      {!isOnline && (
        <div className={S.overlay}>
          <LoaderIcon className={S.loadingIcon} />
          네트워크 연결이 끊겼습니다. 다시 시도해주세요.
        </div>
      )}
      {children}
    </div>
  );
}

export default NetworkErrorModal;
