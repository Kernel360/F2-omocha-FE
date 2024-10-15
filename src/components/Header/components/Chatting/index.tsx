import useGetChatroomList from '@/apis/queryHooks/chat/useGetChatroomList';

import * as S from './Chatting.css';
import ChattingListUnit from './ChattingListUnit';

function Chatting() {
  const { data } = useGetChatroomList({ pageable: 0 });

  if (!data) return null;

  return (
    <div className={S.container}>
      <h3 className={S.title}>채팅 목록</h3>
      <ul>
        {data.content.map(chat => (
          <ChattingListUnit
            key={chat.auction_id}
            auction_id={chat.auction_id}
            room_id={chat.room_id}
            room_name={chat.room_name}
            seller_id={chat.seller_id}
            seller_name={chat.seller_name}
            now_price={chat.now_price}
            buyer_id={chat.buyer_id}
            buyer_name={chat.buyer_name}
            created_date={chat.created_date}
          />
        ))}
      </ul>
    </div>
  );
}

export default Chatting;
