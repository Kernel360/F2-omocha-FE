import useGetChatroomList from '@/apis/queryHooks/chat/useGetChatroomList';
// import ChatModalTest from '@/components/ChatModalTest';

import * as S from './Chatting.css';
import ChattingListUnit from './ChattingListUnit';

// 실질적으로 채팅 리스트가 있는 부분.
// 여기스 클릭이 되고 선태된 요소의 정보를 가지고 채팅방이 열려야해. 이것은 portal로 열려야함. 그래야 어디든 떠있ㅇ르 수 있어..
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
