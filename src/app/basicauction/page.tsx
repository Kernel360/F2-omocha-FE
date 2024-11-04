import { Suspense } from 'react';

import MaxLayout from '@/components/MaxLayout';

import BasicAuction from './basicauction';

function Home() {
  return (
    <Suspense fallback={<div>loading..^^수정필요해용</div>}>
      <MaxLayout>
        <BasicAuction />
      </MaxLayout>
    </Suspense>
  );
}

export default Home;
