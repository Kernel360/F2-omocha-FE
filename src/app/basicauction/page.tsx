'use client';

import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';

function Home() {
  const { data } = useGetBasicAuction(1);
  console.log('data', data?.data.result_data.bid_unit);
  return (
    <div>
      <span>test</span>
      <span>제발</span>
    </div>
  );
}

export default Home;
