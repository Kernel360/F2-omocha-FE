'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
  // useMemo,
  useState,
} from 'react';

import { useQueryClient } from '@tanstack/react-query';
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
  removeNotice: (id: number) => void;
  clearAllNotice: () => void;
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
  const queryClient = useQueryClient();

  console.log(noticeList);

  const addNotice = (notification: Notification) => {
    setNoticeList(prev => [...prev, notification]);
    console.log('notification', notification.data.auction_id);

    console.log('queryClient sse', queryClient);
    console.log(
      '가져와 지니??',
      queryClient.getQueryData(['nowPrice', notification.data.auction_id]),
    );
  };

  const removeNotice = (id: number) => {
    setNoticeList(prev => prev.filter(notification => notification.notification_id !== id));
  };

  const clearAllNotice = () => {
    setNoticeList([]);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    console.log('연결 확인', eventSourceRef.current);

    // 연결 확인
    eventSourceRef.current.addEventListener('CONNECT', (event: MessageEvent) => {
      const { data } = event;
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

        // queryClient.invalidateQueries({
        //   queryKey: ['basicAuction', notification.data.auction_id],
        // });
        // queryClient.invalidateQueries({
        //   queryKey: ['basicAuctionBidList', notification.data.auction_id],
        // });
        // queryClient.invalidateQueries({
        //   queryKey: ['nowPrice', notification.data.auction_id],
        // });
        // queryClient.invalidateQueries({ queryKey: ['bidAuctionHistories'] });
        // queryClient.invalidateQueries({
        //   queryKey: ['nowPrice', notification.data.auction_id],
        // });
      } catch (error) {
        console.error('Failed to parse notification:', error);
      }
    };

    eventSourceRef.current!.addEventListener('BID', e => {
      const notification: Notification = JSON.parse(e.data);
      addNotice(notification);
      // handleEvent(e);
      // queryClient.invalidateQueries({
      //   queryKey: ['basicAuction'],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ['basicAuctionBidList'],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: ['nowPrice', 68],
      //   refetchType: 'all',
      // });
      // queryClient.invalidateQueries({ queryKey: ['bidAuctionHistories'] });
    }); // 입찰
    eventSourceRef.current!.addEventListener('CONCLUDE', e => {
      handleEvent(e);
    }); // 낙찰

    // eslint-disable-next-line consistent-return
    // return () => {
    //   console.log('연결 끊기1', eventSourceRef.current);
    //   if (eventSourceRef.current) {
    //     eventSourceRef.current.close();
    //     console.log('연결 끊기2', eventSourceRef.current);
    //   } else {
    //     console.log('없음');
    //   }
    //   console.log('연결 끊기3', eventSourceRef.current);
    // };
  }, []);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['nowPrice', 68],
    });

    console.log('queryClient effect 따로');
  }, [noticeList, queryClient]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = { noticeList, addNotice, removeNotice, clearAllNotice };

  return <SSEContext.Provider value={contextValue}>{children}</SSEContext.Provider>;
}

export const useSSE = () => {
  const context = useContext(SSEContext);
  if (!context) {
    throw new Error('useEventSource must be used within an EventSourceProvider');
  }
  return context;
};
