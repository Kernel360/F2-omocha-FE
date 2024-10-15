import useGetChatroomList from '@/apis/queryHooks/chat/useGetChatroomList';

import * as S from './Chatting.css';
import ChattingListUnit from './ChattingListUnit';

// interface ChattingProps {
//   content: string;
// }

// const SAMPLE_CHATTING = [
//   {
//     newRead: true,
//     id: 1,
//     title:
//       '도라에몽 팔아요(이건 아마도 게시글 제목?)(이건 아마도 게시글 제목?)(이건 아마도 게시글 제목?)',
//     author: {
//       author_name: 'author',
//       author_id: 8,
//     },
//     buyer: { buyer_name: 'buyer', buyer_id: 6 },
//     post_id: 31,
//     opponent: { opponent_name: 'buyer', opponent_id: 6 },
//     recentMessageTime: 3,
//     recentMessage: '방가방가',
//   },
//   {
//     newRead: false,
//     id: 2,
//     title: '오판츄 팔아요(이건 아마도 게시글 제목?)',
//     author: {
//       author_name: 'author',
//       author_id: 8,
//     },
//     buyer: { buyer_name: 'buyer', buyer_id: 6 },
//     post_id: 31,
//     opponent: { opponent_name: 'buyer', opponent_id: 6 },
//     recentMessageTime: 3,
//     recentMessage: '방가방가',
//   },
//   {
//     newRead: true,
//     id: 3,
//     title: '해덕님 팔아요(이건 아마도 게시글 제목?)',
//     author: {
//       author_name: 'author',
//       author_id: 8,
//     },
//     buyer: { buyer_name: 'buyer', buyer_id: 6 },
//     post_id: 31,
//     opponent: { opponent_name: 'buyer', opponent_id: 6 },
//     recentMessageTime: 3,
//     recentMessage: '방가방가',
//   },
//   {
//     newRead: true,
//     id: 4,
//     title: '대의님 팔아요(이건 아마도 게시글 제목?)',
//     author: {
//       author_name: 'author',
//       author_id: 8,
//     },
//     buyer: { buyer_name: 'buyer', buyer_id: 6 },
//     post_id: 31,
//     opponent: { opponent_name: 'buyer', opponent_id: 6 },
//     recentMessageTime: 3,
//     recentMessage: '방가방가',
//   },
// ];
// { content }: ChattingProps

function Chatting() {
  const { data } = useGetChatroomList({ pageable: 0 });
  console.log('useGetChatroomList', data?.content); // 임시 console.log

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
