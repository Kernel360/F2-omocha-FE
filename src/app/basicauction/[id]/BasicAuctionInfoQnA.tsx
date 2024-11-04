import * as Accordion from '@radix-ui/react-accordion';

import useGetAuctionTTTList from '@/apis/queryHooks/basicAuction/useGetBasicAutionQnAList';
import { AuctionQnAData } from '@/apis/types/basicAuction';

import * as S from './BasicAuctionInfoQnA.css';
import QnAInputSection from './QnAInputSection';
import QnAUnit from './QnAUnit';

interface BasicAuctionInfoTTTProps {
  id: number;
  isSeller: boolean;
  userId: number | undefined;
  userEmail: string | undefined;
}

function BasicAuctionInfoTTT({ id, isSeller, userEmail, userId }: BasicAuctionInfoTTTProps) {
  const { data } = useGetAuctionTTTList(id);

  if (!data) return null;

  return (
    <div className={S.accordionContainer}>
      {!isSeller && <QnAInputSection id={id} userId={userId} userEmail={userEmail} />}
      <Accordion.Root type="single" collapsible>
        {data.result_data.content.length === 0 && (
          <div className={S.NoTTT}>등록된 질문이 없습니다.</div>
        )}
        {data.result_data.content.map((item: AuctionQnAData) => (
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

export default BasicAuctionInfoTTT;
