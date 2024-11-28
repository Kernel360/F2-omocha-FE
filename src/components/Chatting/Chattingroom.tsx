import { OpenAuctionInfo, Message } from '@/apis/types/chat';

import * as S from './Chatting.css';
import ChattingHeader from './ChattingHeader';
import ChattingMessageSection from './ChattingMessageSection';

export interface ChatroomProps {
  roomId: number;
  openAuctionInfo: OpenAuctionInfo;
  lastChat: Message[];
}

function Chattingroom({ roomId, openAuctionInfo, lastChat }: ChatroomProps) {
  return (
    <div className={S.chatroomContainer}>
      <ChattingHeader openAuctionInfo={openAuctionInfo} />
      <ChattingMessageSection roomId={roomId} lastChat={lastChat} />
    </div>
  );
}

export default Chattingroom;
