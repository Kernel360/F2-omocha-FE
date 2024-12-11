import { AccordionContent, AccordionTrigger } from '@radix-ui/react-accordion';
import * as Accordion from '@radix-ui/react-accordion';

import useDeleteBasicAuctionQnA from '@/apis/queryHooks/basicAuction/useDeleteBasicAuctionQnA';
import usePostBasicAuctionQnAAnswer from '@/apis/queryHooks/basicAuction/usePostBasicAuctionQnAAnswer';
import { AuctionQnAData } from '@/apis/types/basicAuction';
import ModalFooter from '@/components/Modal/ModalFooter';
import useBooleanState from '@/hooks/useBooleanState';
import { maskEmail } from '@/utils/textUtils';

import ConfirmDeleteModal from './ConfirmDeleteModal';
import * as S from './QnAUnit.css';

interface QnAUnitProps {
  item: AuctionQnAData;
  userId: number | undefined;
  isSeller: boolean;
}

function QnAUnit({ item, userId, isSeller }: QnAUnitProps) {
  const { mutate: postQnAAnswerMutate } = usePostBasicAuctionQnAAnswer();
  const { mutate: deleteQnAMutate } = useDeleteBasicAuctionQnA();

  const {
    value: isOpenDeleteConfirmModal,
    toggle: setIsOpenDeleteConfirmModal,
    setTrue: openDeleteConfirmModal,
  } = useBooleanState();

  const deleteQuestion = (questionId: number) => {
    deleteQnAMutate(questionId);
    setIsOpenDeleteConfirmModal();
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

  return (
    <Accordion.Item
      key={item.question_details.question_id}
      value={String(item.question_details.question_id)}
      className={S.accordionItem}
    >
      <AccordionTrigger className={S.accordionTrigger}>
        <div className={S.questionWrapper}>
          <div>{item.question_details.title}</div>
          <div className={S.accordionAuthorContent}>
            <div className={S.userEmail}>{maskEmail(item.question_details.email!)}</div>
            <div className={S.createAt}>{item.question_details.created_at}</div>
            <div
              className={item.answer_details ? S.haveAnswerVariants.yes : S.haveAnswerVariants.no}
            >
              {item.answer_details ? 'yes' : 'no'}
            </div>
          </div>
        </div>
        {!item.answer_details && item.question_details.member_id === userId && (
          <button type="button" className={S.questionDeleteButton} onClick={openDeleteConfirmModal}>
            <span>삭제</span>
          </button>
        )}
      </AccordionTrigger>
      <ModalFooter
        isOpen={isOpenDeleteConfirmModal}
        onOpenChange={setIsOpenDeleteConfirmModal}
        positiveButton="삭제"
        positiveButtonEvent={() => deleteQuestion(item.question_details.question_id)}
      >
        <ConfirmDeleteModal />
      </ModalFooter>
      <AccordionContent className={S.accordionContent}>
        {item.question_details.content}
        {!isSeller && item.answer_details && (
          <>
            <span className={S.answerTitle}>답변</span>
            {item.answer_details.content}
          </>
        )}
        {isSeller && item.answer_details && (
          <>
            <span className={S.answerTitle}>답변</span>
            {item.answer_details.content}
          </>
        )}
        {isSeller && !item.answer_details && (
          <form
            className={S.postQnASection}
            onSubmit={e => onsubmitAnswer(e, item.question_details.question_id)}
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
  );
}

export default QnAUnit;
