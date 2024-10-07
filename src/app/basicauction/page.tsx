import { Suspense } from 'react';

import BasicAuction from './basicauction';

function Home() {
  return (
    <Suspense fallback={<div>loading..^^수정필요해용</div>}>
      <BasicAuction />
    </Suspense>
  );
}

export default Home;
