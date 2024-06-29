'use client';
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

export const TOAST_VARIANT = ['success', 'error'] as const;
export type ToastVariantType = (typeof TOAST_VARIANT)[number];

interface ToastContext {
  id: string;
  message: string;
  variant: ToastVariantType;
  duration: number;
  fadeOutDuration: number;
}

type ToastContextProps = {
  toasts: ToastContext[];
  createToast: (message: string, variant: ToastVariantType, duration?: number, fadeOutDuration?: number) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  createToast: (message: string, variant: ToastVariantType) => {
    console.log(`Creating toast with message: ${message} and variant: ${variant}`);
  },
  dismissToast: (id: string) => {
    console.log(`Dismissing toast with ID: ${id}`);
  },
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Array<ToastContext>>([]);
  const toastIdRef = useRef(1);

  const createToast = useCallback((
    message: string,
    variant: ToastVariantType,
    duration = 3000,
    fadeOutDuration = 300
  ) => {
    const id = String(toastIdRef.current++);
    setTimeout(()=>{
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, message, variant, duration, fadeOutDuration },
      ]);
    },0)

  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return useContext(ToastContext);
};