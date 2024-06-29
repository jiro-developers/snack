'use client';
import React, { createContext, useContext, useState } from 'react';

export const TOAST_VARIANT = ['success', 'error'] as const;
export type ToastVariantType = (typeof TOAST_VARIANT)[number];

interface ToastContext {
  id: string;
  message: string;
  variant: ToastVariantType;
}

type ToastContextProps = {
  toasts: ToastContext[];
  createToast: (message: string, variant: ToastVariantType) => void;
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
  const [toastId, setToastId] = useState<number>(1);

  const createToast = (message: string, variant: string) => {
    const nextToasts = [
      ...toasts,
      {
        id: String(toastId),
        message,
        variant,
      } as ToastContext,
    ];

    setToasts(nextToasts);

    setToastId((prev) => prev + 1);
  };

  const dismissToast = async (id: string) => {
    const deleteToastCallback = toasts.filter((toast) => toast.id !== id);

    setToasts(deleteToastCallback);
  };

  return <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>{children}</ToastContext.Provider>;
};

export const useToastContext = () => {
  return useContext(ToastContext);
};