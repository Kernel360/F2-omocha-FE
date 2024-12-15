'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
  useMemo,
  useState,
} from 'react';

import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

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
}

interface SSEContextType {
  noticeList: Notification[];
  addNotice: (notification: Notification) => void;
  clearNotice: () => void;
}

interface SSEtProps {
  children: ReactNode;
  accessToken: string | undefined;
}

const SSEContext = createContext<SSEContextType | undefined>(undefined);

export function ServerSentEventProvider({ children, accessToken }: SSEtProps) {
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const eventSourceRef = useRef<EventSource | null>(null);
  const [noticeList, setNoticeList] = useState<Notification[]>([]);

  const addNotice = (notification: Notification) => {
    console.log('notification', notification);
    setNoticeList(prev => [...prev, notification]);
  };

  const clearNotice = () => {
    setNoticeList([]);
  };

  const startEventSource = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close(); // 이전 연결이 있을 경우 닫기
    }

    eventSourceRef.current = new EventSource(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/notifications/connect`,
      {
        headers: {
          Authorization: `${accessToken!}`,
          Connection: 'keep-alive',
          Accept: 'text/event-stream',
        },
        withCredentials: true,
        heartbeatTimeout: 1800000,
      },
    );

    eventSourceRef.current.addEventListener('CONNECT', (event: MessageEvent) => {
      const { data } = event;
      console.log('event', event);
      if (data === 'Connect Success') {
        console.log('연결 성공', data);
      } else {
        console.log(data);
      }
    });
  };

  useEffect(() => {
    if (!accessToken) return;

    startEventSource();

    const handleEvent = (event: MessageEvent) => {
      try {
        console.log('event', event.data, JSON.parse(event.data));
        const notification: Notification = JSON.parse(event.data);
        addNotice(notification);
      } catch (error) {
        console.error('Failed to parse notification:', error);
      }
    };

    eventSourceRef.current?.addEventListener('BID', handleEvent); // 입찰
    eventSourceRef.current?.addEventListener('CONCLUDE', handleEvent); // 낙찰
    eventSourceRef.current?.addEventListener('BID_SELLER', handleEvent); // 판매자 새 입찰 알림
    eventSourceRef.current?.addEventListener('BID_BUYER', handleEvent); // 구매자 새 입찰 알림
    eventSourceRef.current?.addEventListener('CONCLUDE_SELLER', handleEvent); // 판매자 낙찰 알림
    eventSourceRef.current?.addEventListener('CONCLUDE_BUYER', handleEvent); // 구매자 낙찰 알림
    eventSourceRef.current?.addEventListener('CONCLUDE_OTHER_BUYER', handleEvent); // 구매자 패찰 알림
    eventSourceRef.current?.addEventListener('CONCLUDE_NO_BIDS', handleEvent); // 판매자 입찰 없이 종료 알림

    // eslint-disable-next-line consistent-return
    return () => {
      eventSourceRef.current?.close();
      console.log('연결 끊기');
    };
  }, [accessToken]);

  const contextValue = useMemo(() => ({ noticeList, addNotice, clearNotice }), [noticeList]);

  return <SSEContext.Provider value={contextValue}>{children}</SSEContext.Provider>;
}

export const useSSE = () => {
  const context = useContext(SSEContext);
  if (!context) {
    throw new Error('useEventSource must be used within an EventSourceProvider');
  }
  return context;
};
