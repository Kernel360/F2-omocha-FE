import * as Dialog from '@radix-ui/react-dialog';

import DeleteIcon from '@/assets/svg/delete.svg';

import * as S from './Modal.css';

interface ModalHeaderFooterProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  positiveButton: string;
  negativeButton: string;
  positiveButtonEvent: () => void;
}

export default function ModalHeaderFooter(SAMPLE: ModalHeaderFooterProps) {
  const {
    isOpen,
    onOpenChange,
    children,
    title,
    positiveButton,
    negativeButton,
    positiveButtonEvent,
  } = SAMPLE;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={S.overlay} />
        <Dialog.Content className={S.modal}>
          <div className={S.header}>
            <Dialog.Title className={S.headerTitle}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <DeleteIcon />
            </Dialog.Close>
          </div>
          <div className={S.content}>{children}</div>
          <div className={S.footerButton}>
            <button className={S.button.positiveButton} type="button" onClick={positiveButtonEvent}>
              {positiveButton}
            </button>
            <Dialog.Close asChild>
              <button className={S.button.negativeButton} type="button">
                {negativeButton}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
