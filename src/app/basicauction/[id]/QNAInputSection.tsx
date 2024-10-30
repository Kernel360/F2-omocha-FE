/* eslint-disable jsx-a11y/label-has-associated-control */
import { AccordionContent, AccordionTrigger } from '@radix-ui/react-accordion';
import * as Accordion from '@radix-ui/react-accordion';

import usePostBasicAuctionQnA from '@/apis/queryHooks/basicAuction/usePostBasicAuctionQnA';
import { Modal } from '@/components/Modal/Modal';
import useBooleanState from '@/hooks/useBooleanState';

import HaveToLoginNotiModal from './HaveToLoginNotiModal';
import * as S from './QNAInputSection.css';

interface QNAInputSectionProps {
  id: number;
  userId: number | undefined;
  userEmail: string | undefined;
}

function QNAInputSection({ id, userId, userEmail }: QNAInputSectionProps) {
  const { mutate: postQnAMutate } = usePostBasicAuctionQnA();

  const {
    value: isOpenLoginModal,
    toggle: setIsOpenLoginModal,
    setTrue: openLoginModal,
  } = useBooleanState();

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    postQnAMutate({ auction_id: id, title, content });
  };

  return (
    <>
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="postQNATrigger" className={S.accordionItemButton}>
          {userId ? (
            <AccordionTrigger className={S.qnaPostButton}>QnA 쓰기</AccordionTrigger>
          ) : (
            <button type="button" className={S.qnaPostButton} onClick={openLoginModal}>
              QnA 쓰기
            </button>
          )}
          <AccordionContent className={S.accordionPostQnAContent}>
            <>
              <form className={S.postQnASection} onSubmit={onsubmit}>
                <div className={S.postQnAWrapper}>
                  <label htmlFor="userId" className={S.postQnALable}>
                    이메일
                  </label>
                  <span className={S.postQnAText}>{userEmail}</span>
                </div>
                <div className={S.postQnAWrapperTop}>
                  <label htmlFor="title" className={S.postQnALable}>
                    제목
                  </label>
                  <input id="title" name="title" className={S.postQnATextAreaTitle} required />
                </div>
                <div className={S.postQnAWrapperTop}>
                  <label htmlFor="content" className={S.postQnALable}>
                    문의내용
                  </label>
                  <textarea id="content" name="content" className={S.postQnATextAreaContent} />
                </div>
                <div className={S.buttonWrapper}>
                  <AccordionTrigger>
                    <button type="button" className={S.postQnAButton.close}>
                      닫기
                    </button>
                  </AccordionTrigger>
                  <button type="submit" className={S.postQnAButton.submit}>
                    등록
                  </button>
                </div>
              </form>
              <ul className={S.postQnANoticeSection}>
                <span className={S.postQnANoticeTitle}>QnA 작성시 유의사항</span>
                <li className={S.postQnANoticeUnit}>
                  현재 비밀글 서비스가 제공되지 않습니다. QnA작성 시 이메일 전화번호 등 개인 정보를
                  주의해주세요.
                </li>
              </ul>
            </>
          </AccordionContent>
        </Accordion.Item>
      </Accordion.Root>
      <Modal isOpen={isOpenLoginModal} onOpenChange={setIsOpenLoginModal}>
        <HaveToLoginNotiModal />
      </Modal>
    </>
  );
}

export default QNAInputSection;
