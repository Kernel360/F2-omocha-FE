import { AccordionContent, AccordionTrigger } from '@radix-ui/react-accordion';
import * as Accordion from '@radix-ui/react-accordion';

import useGetAuctionQNAList from '@/apis/queryHooks/basicAuction/useGetBasicAutionQnAList';
import { AuctionQNAData } from '@/apis/types/basicAuction';

import * as S from './BasicAuctionInfoQNA.css';

interface BasicAuctionInfoQNAProps {
  id: number;
  isSeller: boolean;
}

function BasicAuctionInfoQNA({ id, isSeller }: BasicAuctionInfoQNAProps) {
  console.log('isSeller', isSeller); // 임시 뺄수도

  const { data } = useGetAuctionQNAList(id);
  if (!data) return null;

  console.log('data QnA 내용임.', data.result_data.content);

  return (
    <Accordion.Root className={S.accordionContainer} type="single" collapsible>
      {data.result_data.content.map((item: AuctionQNAData) => (
        <Accordion.Item
          key={item.question_response.question_id}
          value={String(item.question_response.question_id)}
          className={S.accordionItem}
        >
          <AccordionTrigger className={S.accordionTrigger}>
            <div>{item.question_response.title}</div>
            <div className={S.accordionAuthorContent}>
              <div>{item.question_response.email}</div>
              <div>{item.question_response.created_at}</div>
              <div>{item.answer_response ? 'yes' : 'no'}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent className={S.accordionContent}>
            {item.question_response.content}
          </AccordionContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export default BasicAuctionInfoQNA;
