import * as S from './Chatting.css';

interface ChattingListUnitProps {
  chat: {
    newRead: boolean;
    id: number;
    title: string;
    recentMessageTime: number;
    recentMessage: string;
    author: {
      author_name: string;
      author_id: number;
    };
    buyer: { buyer_name: string; buyer_id: number };
    opponent: { opponent_name: string; opponent_id: number };
  };
}

function ChattingListUnit({ chat }: ChattingListUnitProps) {
  const { newRead, id, title, recentMessageTime, recentMessage, opponent } = chat;
  const openChatting = () => {
    console.log('id', id);
  };

  return (
    <li key={id}>
      <button type="button" className={S.chattingUnitSection} onClick={openChatting}>
        <div className={newRead ? S.isReadDot.read : S.isReadDot.noRead} />
        <div className={S.chattingUnit}>
          <div className={S.chattingUnitInfo}>
            <span className={S.chatOpponent}>{opponent.opponent_name}</span>
            <span className={S.chatTitle}>{title}</span>
            <span className={S.recentChatTime}>{recentMessageTime}분 전</span>
          </div>
          <span className={S.recentChat}>{recentMessage}</span>
        </div>
      </button>
    </li>
  );
}

export default ChattingListUnit;
