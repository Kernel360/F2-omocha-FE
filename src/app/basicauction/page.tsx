import { Suspense } from 'react';

import BasicAuction from './basicauction';

function Home() {
  return (
    <Suspense fallback={<div>loading..^^</div>}>
      <BasicAuction />
    </Suspense>
  );
}

export default Home;
