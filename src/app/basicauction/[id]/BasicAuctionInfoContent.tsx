import DOMPurify from 'dompurify';

import { convertSlateToHTML } from '@/utils/convertSlateToHTML';

interface BasicAuctionInfoContentProps {
  content: string;
}

function BasicAuctionInfoContent({ content }: BasicAuctionInfoContentProps) {
  const contentArray = JSON.parse(content);

  const htmlContent = convertSlateToHTML(contentArray);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(htmlContent),
      }}
    />
  );
}

export default BasicAuctionInfoContent;
