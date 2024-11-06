import * as Dialog from '@radix-ui/react-dialog';
import { CircleXIcon } from 'lucide-react';

import * as S from './Modal.css';

interface ModalFooterProps {
  isOpen: boolean;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  positiveButton: string;
  positiveButtonEvent: () => void;
}

export default function ModalFooter(SAMPLE: ModalFooterProps) {
  const { isOpen, children, onOpenChange, positiveButton, positiveButtonEvent } = SAMPLE;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={S.overlay} />
        <Dialog.Content className={S.modal} aria-describedby={undefined}>
          <Dialog.Close asChild>
            <div className={S.closeButton}>
              <CircleXIcon />
            </div>
          </Dialog.Close>
          <div className={S.content}>{children}</div>
          <div className={S.footerButton}>
            <button className={S.button.positiveButton} type="button" onClick={positiveButtonEvent}>
              {positiveButton}
            </button>
            <Dialog.Close asChild>
              <button className={S.button.negativeButton} type="button">
                취소
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
