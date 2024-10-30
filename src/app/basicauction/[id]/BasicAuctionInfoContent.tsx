import DOMPurify from 'dompurify';

import { convertSlateToHTML } from '@/utils/convertSlateToHTML';

import * as S from './BasicAuctionInfoContent.css';

interface BasicAuctionInfoContentProps {
  content: string;
}

function BasicAuctionInfoContent({ content }: BasicAuctionInfoContentProps) {
  console.log(content);
  const contentArray = JSON.parse(content);
  console.log(contentArray);

  const htmlContent = convertSlateToHTML(contentArray);

  return (
    <div
      className={S.content}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(htmlContent),
      }}
    />
  );
}

export default BasicAuctionInfoContent;
