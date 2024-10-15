interface BasicAuctionInfoContentProps {
  id: number;
  content: string;
}

function BasicAuctionInfoContent({ id, content }: BasicAuctionInfoContentProps) {
  console.log(id); // 임시 뺄수도

  return <div>{content}</div>;
}

export default BasicAuctionInfoContent;
