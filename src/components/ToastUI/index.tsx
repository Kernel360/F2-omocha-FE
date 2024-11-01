import React, { useEffect } from 'react';

import * as Toast from '@radix-ui/react-toast';

import ErrorIcon from '@/assets/svg/circle-alert.svg';
import SuccessIcon from '@/assets/svg/circle-check.svg';
import InfoIcon from '@/assets/svg/circle-info.svg';
import WarningIcon from '@/assets/svg/triangle-alert.svg';

import * as S from './ToastUI.css';

interface ToastUIProps {
  open: boolean;
  type: 'default' | 'success' | 'info' | 'error' | 'warning';
  message: string;
  onClose: () => void;
}

const TOAST_ICON = {
  default: '🔔',
  success: <SuccessIcon fill="#06BC0B" stroke="white" />,
  info: <InfoIcon fill="#2196F3" width="24px" height="24px" />,
  error: <ErrorIcon fill="#F44336" stroke="white" />,
  warning: <WarningIcon className={S.warningIcon} />,
};

function ToastUI({ open, type, message, onClose }: ToastUIProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Toast.Root
      className={`${S.toastRoot} ${S.toastTypes[type]}`}
      open={open}
      onOpenChange={onClose}
    >
      <div className={S.toastContent}>
        <span className={S.toastIcon}>{TOAST_ICON[type]}</span>
        <div className={S.toastMessage}>{message}</div>
        <button type="button" onClick={onClose} className={S.closeButton}>
          ✕
        </button>
      </div>
      <div className={S.toastProgress} />
    </Toast.Root>
  );
}

export default ToastUI;
