import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

function Portal({ children }: PortalProps) {
  const element = typeof window !== 'undefined' && document.querySelector(`#root-portal`);

  return element && children ? createPortal(children, element) : null;
}

export default Portal;
