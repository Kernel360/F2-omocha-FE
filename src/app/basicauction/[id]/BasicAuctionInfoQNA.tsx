import { AccordionContent, AccordionTrigger } from '@radix-ui/react-accordion';
import * as Accordion from '@radix-ui/react-accordion';

import useGetAuctionQNAList from '@/apis/queryHooks/basicAuction/useGetBasicAutionQnAList';
import { AuctionQNAData } from '@/apis/types/basicAuction';

import * as S from './BasicAuctionInfoQNA.css';
import usePostBasicAuctionQnA from '@/apis/queryHooks/basicAuction/usePostBasicAuctionQnA';

interface BasicAuctionInfoQNAProps {
  id: number;
  isSeller: boolean;
  userEmail: string | undefined;
}

function BasicAuctionInfoQNA({ id, isSeller, userEmail }: BasicAuctionInfoQNAProps) {
  const { data } = useGetAuctionQNAList(id);
  const { mutate: postQnAMutate } = usePostBasicAuctionQnA();

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    console.log(title, content, ':', id);
    postQnAMutate({ auction_id: id, title, content });
  };

  if (!data) return null;

  return (
    <div className={S.accordionContainer}>
      {!isSeller && (
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value={'postQNATrigger'} className={S.accordionItemButton}>
            <AccordionTrigger className={S.qnaPostButton}>QnA 쓰기</AccordionTrigger>
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
                    <input name="title" className={S.postQnATextAreaTitle} required />
                  </div>
                  <div className={S.postQnAWrapperTop}>
                    <label htmlFor="content" className={S.postQnALable}>
                      문의내용
                    </label>
                    <textarea name="content" className={S.postQnATextAreaContent} />
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
              <div>{item.question_response.title}</div>
              <div className={S.accordionAuthorContent}>
                <div className={S.userEmail}>{item.question_response.email}</div>
                <div className={S.createAt}>{item.question_response.created_at}</div>
                <div
                  className={
                    item.answer_response ? S.haveAnswerVariants.yes : S.haveAnswerVariants.no
                  }
                >
                  {item.answer_response ? 'yes' : 'no'}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className={S.accordionContent}>
              {item.question_response.content}
              {item.answer_response && (
                <>
                  <span className={S.answerTitle}>답변.</span>
                  {item.answer_response.content}
                </>
              )}
            </AccordionContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

export default BasicAuctionInfoQNA;
