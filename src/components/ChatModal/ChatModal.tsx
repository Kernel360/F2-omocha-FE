import * as Dialog from '@radix-ui/react-dialog';

// import DeleteIcon from '@/assets/svg/delete.svg';

import * as S from './ChatModal.css';

export interface ChatModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
}

export function ChatModal(SAMPLE: ChatModalProps) {
  const { isOpen, children, onOpenChange } = SAMPLE;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* <Dialog.Overlay className={S.overlay} /> */}
        <Dialog.Content className={S.modal}>
          {/* <Dialog.Close asChild>
            <div className={S.closeButton}>
              <DeleteIcon />
            </div>
          </Dialog.Close> */}
          <div className={S.content}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
