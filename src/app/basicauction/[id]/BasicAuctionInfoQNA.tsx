import useGetAuctionQNAList from '@/apis/queryHooks/basicAuction/useGetBasicAutionQnAList';

interface BasicAuctionInfoQNAProps {
  id: number;
}

function BasicAuctionInfoQNA({ id }: BasicAuctionInfoQNAProps) {
  console.log(id); // 임시 뺄수도
  const { data } = useGetAuctionQNAList(id);
  console.log('data QnA 내용임.', data);
  return (
    <>
      <div>BasicAuctionInfoQNA</div>
      <div>Q</div>
    </>
  );
}

export default BasicAuctionInfoQNA;
