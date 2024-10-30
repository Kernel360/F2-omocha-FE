/* eslint-disable jsx-a11y/label-has-associated-control */

import { AccordionContent, AccordionTrigger } from '@radix-ui/react-accordion';
import * as Accordion from '@radix-ui/react-accordion';

import useDeleteBasicAuctionQnA from '@/apis/queryHooks/basicAuction/useDeleteBasicAuctionQnA';
import useGetAuctionQNAList from '@/apis/queryHooks/basicAuction/useGetBasicAutionQnAList';
import usePostBasicAuctionQnA from '@/apis/queryHooks/basicAuction/usePostBasicAuctionQnA';
import usePostBasicAuctionQnAAnswer from '@/apis/queryHooks/basicAuction/usePostBasicAuctionQnAAnswer';
import { AuctionQNAData } from '@/apis/types/basicAuction';
import { Modal } from '@/components/Modal/Modal';
import ModalFooter from '@/components/Modal/ModalFooter';
import useBooleanState from '@/hooks/useBooleanState';
import maskEmail from '@/utils/maskEmail';

import * as S from './BasicAuctionInfoQNA.css';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import HaveToLoginNotiModal from './HaveToLoginNotiModal';

interface BasicAuctionInfoQNAProps {
  id: number;
  isSeller: boolean;
  userId: number | undefined;
  userEmail: string | undefined;
}

function BasicAuctionInfoQNA({ id, isSeller, userEmail, userId }: BasicAuctionInfoQNAProps) {
  const {
    value: isOpenLoginModal,
    toggle: setIsOpenLoginModal,
    setTrue: openLoginModal,
  } = useBooleanState();

  const {
    value: isOpenDeleteConfirmModal,
    toggle: setIsOpenDeleteConfirmModal,
    setTrue: openDeleteConfirmModal,
  } = useBooleanState();

  const { data } = useGetAuctionQNAList(id);
  const { mutate: postQnAMutate } = usePostBasicAuctionQnA();
  const { mutate: postQnAAnswerMutate } = usePostBasicAuctionQnAAnswer();
  const { mutate: deleteQnAMutate } = useDeleteBasicAuctionQnA();

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    postQnAMutate({ auction_id: id, title, content });
  };

  const onsubmitAnswer = (e: React.FormEvent<HTMLFormElement>, question_id: number) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const answer = formData.get('answer') as string;

    postQnAAnswerMutate({
      question_id,
      title: `${question_id}번 답변`,
      content: answer,
    });
  };

  const deleteQuestion = (questionId: number) => {
    deleteQnAMutate(questionId);
    setIsOpenDeleteConfirmModal();
  };

  if (!data) return null;

  return (
    <div className={S.accordionContainer}>
      {!isSeller && (
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
                    현재 비밀글 서비스가 제공되지 않습니다. QnA작성 시 이메일 전화번호 등 개인
                    정보를 주의해주세요.
                  </li>
                </ul>
              </>
            </AccordionContent>
          </Accordion.Item>
        </Accordion.Root>
      )}
      <Accordion.Root type="single" collapsible>
        {data.result_data.content.map((item: AuctionQNAData) => (
          <Accordion.Item
            key={item.question_response.question_id}
            value={String(item.question_response.question_id)}
            className={S.accordionItem}
          >
            <AccordionTrigger className={S.accordionTrigger}>
              <div className={S.questionWrapper}>
                <div>{item.question_response.title}</div>
                <div className={S.accordionAuthorContent}>
                  <div className={S.userEmail}>{maskEmail(item.question_response.email!)}</div>
                  <div className={S.createAt}>{item.question_response.created_at}</div>
                  <div
                    className={
                      item.answer_response ? S.haveAnswerVariants.yes : S.haveAnswerVariants.no
                    }
                  >
                    {item.answer_response ? 'yes' : 'no'}
                  </div>
                </div>
              </div>
              {item.question_response.member_id === userId && (
                <button
                  type="button"
                  className={S.questionDeleteButton}
                  onClick={openDeleteConfirmModal}
                >
                  <span>삭제</span>
                </button>
              )}
            </AccordionTrigger>
            <ModalFooter
              isOpen={isOpenDeleteConfirmModal}
              onOpenChange={setIsOpenDeleteConfirmModal}
              positiveButton="삭제"
              positiveButtonEvent={() => deleteQuestion(item.question_response.question_id)}
            >
              <ConfirmDeleteModal />
            </ModalFooter>
            <AccordionContent className={S.accordionContent}>
              {item.question_response.content}
              {!isSeller && item.answer_response && (
                <>
                  <span className={S.answerTitle}>답변</span>
                  {item.answer_response.content}
                </>
              )}
              {isSeller && item.answer_response && (
                <>
                  <span className={S.answerTitle}>답변</span>
                  {item.answer_response.content}
                </>
              )}
              {isSeller && !item.answer_response && (
                <form
                  className={S.postQnASection}
                  onSubmit={e => onsubmitAnswer(e, item.question_response.question_id)}
                >
                  <div className={S.answerPostSection}>
                    <textarea name="answer" className={S.postQnATextAreaContent} required />
                    <button type="submit" className={S.postQnAButton.submit}>
                      답변 등록
                    </button>
                  </div>
                </form>
              )}
            </AccordionContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <Modal isOpen={isOpenLoginModal} onOpenChange={setIsOpenLoginModal}>
        <HaveToLoginNotiModal />
      </Modal>
    </div>
  );
}

export default BasicAuctionInfoQNA;
