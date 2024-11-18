import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { CircleXIcon } from 'lucide-react';

import * as S from './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
}

export function Modal(SAMPLE: ModalProps) {
  const { isOpen, children, onOpenChange } = SAMPLE;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={S.overlay} />
        <Dialog.Content className={S.modal}>
          <VisuallyHidden.Root asChild>
            <Dialog.Title />
          </VisuallyHidden.Root>
          <Dialog.Description aria-describedby="undefined" />
          <Dialog.Close asChild>
            <div className={S.closeButton}>
              <CircleXIcon />
            </div>
          </Dialog.Close>
          <div className={S.content}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
