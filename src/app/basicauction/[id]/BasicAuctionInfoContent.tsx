import DOMPurify from 'dompurify';

import { convertSlateToHTML } from '@/utils/convertSlateToHTML';

import * as S from './BasicAuctionInfoContent.css';

interface BasicAuctionInfoContentProps {
  content: string;
}

function BasicAuctionInfoContent({ content }: BasicAuctionInfoContentProps) {
  const contentArray = JSON.parse(content);

  const htmlContent = convertSlateToHTML(contentArray);

  return (
    htmlContent && (
      <div
        className={S.content}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(htmlContent),
        }}
      />
    )
  );
}

export default BasicAuctionInfoContent;
