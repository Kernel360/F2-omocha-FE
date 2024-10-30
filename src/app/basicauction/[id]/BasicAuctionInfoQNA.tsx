import { AccordionContent, AccordionTrigger } from '@radix-ui/react-accordion';
import * as Accordion from '@radix-ui/react-accordion';

import useDeleteBasicAuctionQnA from '@/apis/queryHooks/basicAuction/useDeleteBasicAuctionQnA';
import useGetAuctionQNAList from '@/apis/queryHooks/basicAuction/useGetBasicAutionQnAList';
import usePostBasicAuctionQnAAnswer from '@/apis/queryHooks/basicAuction/usePostBasicAuctionQnAAnswer';
import { AuctionQNAData } from '@/apis/types/basicAuction';
import ModalFooter from '@/components/Modal/ModalFooter';
import useBooleanState from '@/hooks/useBooleanState';
import maskEmail from '@/utils/maskEmail';

import * as S from './BasicAuctionInfoQNA.css';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import QNAInputSection from './QNAInputSection';

interface BasicAuctionInfoQNAProps {
  id: number;
  isSeller: boolean;
  userId: number | undefined;
  userEmail: string | undefined;
}

function BasicAuctionInfoQNA({ id, isSeller, userEmail, userId }: BasicAuctionInfoQNAProps) {
  const {
    value: isOpenDeleteConfirmModal,
    toggle: setIsOpenDeleteConfirmModal,
    setTrue: openDeleteConfirmModal,
  } = useBooleanState();

  const { data } = useGetAuctionQNAList(id);

  const { mutate: postQnAAnswerMutate } = usePostBasicAuctionQnAAnswer();
  const { mutate: deleteQnAMutate } = useDeleteBasicAuctionQnA();

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
      {!isSeller && <QNAInputSection id={id} userId={userId} userEmail={userEmail} />}
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
    </div>
  );
}

export default BasicAuctionInfoQNA;
