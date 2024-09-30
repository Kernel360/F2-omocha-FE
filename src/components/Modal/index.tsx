import DeleteIcon from '@/assets/svg/delete.svg';
import Portal from '@/components/Portal';

import * as S from './Modal.css';

export interface ModalProps {
  content: string;
  rightButton: string;
  leftButton: string;
  onEvent: () => void;
  onClose: () => void;
}

export function Modal(SAMPLE: ModalProps) {
  const { content, rightButton, leftButton, onEvent, onClose } = SAMPLE;

  return (
    <Portal>
      <div className={S.overlay}>
        <div className={S.modal}>
          <button className={S.buttonHeader} type="button" onClick={onClose}>
            <DeleteIcon />
          </button>
          <div className={S.content}>{content || '현재 준비 중인 이벤트입니다.'}</div>
          <span className={S.buttonFooter}>
            <button type="button" className={S.button.left} onClick={onEvent}>
              {leftButton}
            </button>
            <button type="button" className={S.button.right} onClick={onClose}>
              {rightButton}
            </button>
          </span>
        </div>
      </div>
    </Portal>
  );
}
