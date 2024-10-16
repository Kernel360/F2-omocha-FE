'use client';

import { useRef } from 'react';

import * as S from './ChatModalTest.css';

function ChatModalTest() {
  // 포탈을 지움
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={S.chatroomContainer}>
      <div className={S.chatroomHeader}>roomId가 들어갈 것</div>
      <div className={S.chatListWrapper}>
        {/* {messages.map(msg => {
          return (
            <div
              key={`${msg.date}+${msg.text}`}
              className={msg.sender_id === ME ? S.msgBox.myMsg : S.msgBox.opponentMsg}
            >
              <div className={msg.sender_id === ME ? S.msgWrapper.myMsg : S.msgWrapper.opponentMsg}>
                <span className={S.msg}>{msg.text}</span>
              </div>
              <p className={S.msgDate}>{msg.date}</p>
            </div>
          );
        })} */}
      </div>
      <form
        onSubmit={event => {
          event.preventDefault();
          console.log('sendHandler가 들어갈것임');
        }}
      >
        <div className={S.inputSection}>
          <input
            type="text"
            ref={inputRef}
            placeholder="메시지를 입력하세요..."
            className={S.inputWrapper}
          />
          <button type="submit" className={S.submitButton}>
            전송
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatModalTest;
