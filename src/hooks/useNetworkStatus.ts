import { useEffect, useState } from 'react';

interface UseNetworkStatusProps {
  onOnline?: () => void;
  onOffline?: () => void;
}
function useNetworkStatus({ onOnline, onOffline }: UseNetworkStatusProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (onOnline) {
        onOnline();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (onOffline) {
        onOffline();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onOnline, onOffline]);

  return isOnline;
}

export default useNetworkStatus;
