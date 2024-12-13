import { useEffect, useRef } from 'react';

import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface UseSocketParams {
  url: string;
  config: StompJs.StompConfig;
  afterConnect: (client: StompJs.Client) => void;
}

function useSocket({ url, config, afterConnect }: UseSocketParams) {
  const client = useRef<StompJs.Client>();

  const connect = () => {
    client.current = new StompJs.Client({
      ...config,
      webSocketFactory: () => new SockJS(url),
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
    connect();

    return () => {
      if (client) {
        disconnect();
      }
    };
  }, []);

  return { client: client.current };
}

export default useSocket;
