import { useCallback, useState } from 'react';

/**
열기, 닫기, 토글 시나리오에서 사용되는 훅입니다.
*/
function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, onOpen, onClose, onToggle };
}

export default useDisclosure;
