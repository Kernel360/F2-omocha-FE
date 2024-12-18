'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
  useState,
  useMemo,
} from 'react';

// import { useQueryClient } from '@tanstack/react-query';

import { useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

import usePostNotice from '@/apis/queryHooks/alarm/usePostNotice';
import usePostNoticeAll from '@/apis/queryHooks/alarm/usePostNoticeAll';
import { formatDate } from '@/utils/dateUtils';

export interface Notification {
  notification_id: number;
  notification_code: string;
  data: {
    auction_id: number;
    title: string;
    thumbnail_path: string;
    conclude_price: number | null;
    now_price: number | null;
  };
  create_at: string;
  isNew?: boolean;
}

interface SSEContextType {
  noticeList: Notification[];
  addNotice: (notification: Notification) => void;
  removeNotice: (id: number) => void;
  clearAllNotice: () => void;
}

interface SSEtProps {
  children: ReactNode;
  accessToken: string | undefined;
}

const NOW_DATE = formatDate(new Date().toString());

const SSEContext = createContext<SSEContextType | undefined>(undefined);

export function ServerSentEventProvider({ children, accessToken }: SSEtProps) {
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const eventSourceRef = useRef<EventSource | null>(null);
  const [noticeList, setNoticeList] = useState<Notification[]>([]);
  const { mutate: postReadNotice } = usePostNotice();
  const { mutate: postReadNoticeAll } = usePostNoticeAll();
  let eventId = '';
  const queryClient = useQueryClient();

  const addNotice = (notification: Notification) => {
    const isNew = formatDate(notification.create_at) > NOW_DATE;
    setNoticeList(prev => [...prev.map(notice => ({ ...notice })), { ...notification, isNew }]);
    queryClient.invalidateQueries({
      queryKey: ['basicAuction', notification.data.auction_id],
    });
    queryClient.invalidateQueries({
      queryKey: ['basicAuctionBidList', notification.data.auction_id],
    });
    queryClient.invalidateQueries({
      queryKey: ['nowPrice', notification.data.auction_id],
    });
    queryClient.invalidateQueries({ queryKey: ['bidAuctionHistories'] });
  };

  const removeNotice = (id: number) => {
    setNoticeList(prev => prev.filter(notification => notification.notification_id !== id));
    postReadNotice(id);
  };

  const clearAllNotice = () => {
    setNoticeList([]);
    postReadNoticeAll(noticeList.map(notice => notice.notification_id));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startEventSource = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close(); // 이전 연결이 있을 경우 닫기
    }

    eventSourceRef.current = new EventSource(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/notifications/connect${eventId ? `?lastEventId=${eventId}` : ''}`,
      {
        headers: {
          Authorization: `${accessToken!}`,
          Connection: 'keep-alive',
        },
        withCredentials: true,
        heartbeatTimeout: 1800000,
      },
    );

    // 연결 확인
    eventSourceRef.current.addEventListener('CONNECT', (event: MessageEvent) => {
      const { data } = event;
      eventId = event.lastEventId || '';
      console.log('연결 확인', event.lastEventId);
      if (data === 'Connect Success') {
        console.log('연결 성공');
      }
    });
  };

  useEffect(() => {
    if (!accessToken) return;

    startEventSource();

    const handleEvent = (event: MessageEvent) => {
      try {
        const notification: Notification = JSON.parse(event.data);
        addNotice(notification);
      } catch (error) {
        console.error('Failed to parse notification:', error);
      }
    };

    eventSourceRef.current!.addEventListener('BID', handleEvent); // 입찰
    eventSourceRef.current!.addEventListener('CONCLUDE', handleEvent); // 낙찰

    // eslint-disable-next-line consistent-return
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log('연결 끊기', eventSourceRef.current);
      }
    };
  }, [accessToken]);

  const contextValue = useMemo(
    () => ({
      noticeList,
      addNotice,
      removeNotice,
      clearAllNotice,
    }),
    [noticeList],
  );

  return <SSEContext.Provider value={contextValue}>{children}</SSEContext.Provider>;
}

export const useSSE = () => {
  const context = useContext(SSEContext);
  if (!context) {
    throw new Error('useEventSource must be used within an EventSourceProvider');
  }
  return context;
};
