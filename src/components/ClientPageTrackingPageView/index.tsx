'use client';

import useTrackingPageView from '@/hooks/useTrackingPageView';

interface ClientSidePageRefProps {
  eventId: string;
}

function ClientSidePageRef({ eventId }: ClientSidePageRefProps) {
  const { pageRef } = useTrackingPageView({ pageViewEventName: eventId });
  return <div ref={pageRef} />;
}

export default ClientSidePageRef;
