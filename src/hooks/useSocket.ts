import { useEffect, useRef } from 'react';

import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface UseSocketParams {
  access: string | undefined;
  url: string;
  config: StompJs.StompConfig;
  afterConnect: (client: StompJs.Client) => void;
}

function useSocket({ access, url, config, afterConnect }: UseSocketParams) {
  const client = useRef<StompJs.Client>();

  const connect = () => {
    client.current = new StompJs.Client({
      ...config,
      webSocketFactory: () => new SockJS(url),
      connectHeaders: {
        Authorization: access || '', // access token이 없는 경우를 좀 더 살펴야겠음
      },
    });

    client.current.onConnect = () => {
      // client 연결 이후 실행할 요소들
      if (client.current) {
        afterConnect(client.current);
      }
    };

    client.current.activate();
  };

  const disconnect = () => {
    client.current?.deactivate();
  };

  useEffect(() => {
    if (access) connect();

    return () => {
      if (client) {
        disconnect();
      }
    };
  }, []);

  return { client: client.current };
}

export default useSocket;
