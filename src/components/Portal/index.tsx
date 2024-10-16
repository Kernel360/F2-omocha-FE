import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

function Portal({ children }: PortalProps) {
  const element = typeof window !== 'undefined' && document.querySelector(`#root-portal`);

  return element && children ? createPortal(children, element) : null;
}

export default Portal;

// function Portal(props: PortalProps) {
//   const { children } = props;
//   const [element, setElement] = useState<HTMLElement | null>(null);

//   useEffect(() => {
//     setElement(document.getElementById('portal'));
//   }, []);

//   if (!element) {
//     return null;
//   }

//   return ReactDOM.createPortal(children, element);
// }

// export default Portal;
