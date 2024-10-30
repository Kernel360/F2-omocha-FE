import * as Accordion from '@radix-ui/react-accordion';

import useGetAuctionQNAList from '@/apis/queryHooks/basicAuction/useGetBasicAutionQnAList';
import { AuctionQNAData } from '@/apis/types/basicAuction';

import * as S from './BasicAuctionInfoQNA.css';
import QNAInputSection from './QNAInputSection';
import QnAUnit from './QnAUnit';

interface BasicAuctionInfoQNAProps {
  id: number;
  isSeller: boolean;
  userId: number | undefined;
  userEmail: string | undefined;
}

function BasicAuctionInfoQNA({ id, isSeller, userEmail, userId }: BasicAuctionInfoQNAProps) {
  const { data } = useGetAuctionQNAList(id);

  if (!data) return null;

  return (
    <div className={S.accordionContainer}>
      {!isSeller && <QNAInputSection id={id} userId={userId} userEmail={userEmail} />}
      <Accordion.Root type="single" collapsible>
        {data.result_data.content.length === 0 && (
          <div className={S.NoQNA}>등록된 질문이 없습니다.</div>
        )}
        {data.result_data.content.map((item: AuctionQNAData) => (
          <QnAUnit
            key={item.question_response.question_id}
            item={item}
            userId={userId}
            isSeller={isSeller}
          />
        ))}
      </Accordion.Root>
    </div>
  );
}

export default BasicAuctionInfoQNA;
