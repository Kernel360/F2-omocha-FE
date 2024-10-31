'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import * as Toast from '@radix-ui/react-toast';

import ToastUI from '@/components/ToastUI';

import * as S from '../components/ToastUI/ToastUI.css';

type ToastType = 'default' | 'success' | 'info' | 'error' | 'warning';

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('default');

  const showToast = useCallback((toastType: ToastType, messageType: string) => {
    setType(toastType);
    setMessage(messageType);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast.Provider>
        <ToastUI open={open} type={type} message={message} onClose={handleClose} />
        <Toast.Viewport className={S.toastViewport} />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast는 ToastProvider 내네엇만 사용할 수 있습니다.');
  }
  return context;
};
