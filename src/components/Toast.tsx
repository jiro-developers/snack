'use client';

import React, { useEffect, useState } from 'react';

import { CheckCircle, XCircle, X } from 'lucide-react';

import { cn } from '@/lib/utils';

type ToastVariantType = 'success' | 'error';

const ICONS_BY_VARIANT = {
  success: CheckCircle,
  error: XCircle,
};

interface ToastProps {
  id: string;
  variant: ToastVariantType;
  children: React.ReactNode;
  showIcon?: boolean;
  onDismiss: (id: string) => void;
  duration: number;
  fadeOutDuration: number;
}

const Toast: React.FC<ToastProps> = ({
  id,
  variant,
  children,
  showIcon = false,
  onDismiss,
  duration,
  fadeOutDuration,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = ICONS_BY_VARIANT[variant];

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration - fadeOutDuration);

    const dismissTimer = setTimeout(() => {
      onDismiss(id);
    }, duration);

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(dismissTimer);
    };
  }, [id, duration, fadeOutDuration, onDismiss]);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded w-[312px] my-4 transition-opacity',
        variant === 'success' ? 'bg-black' : 'bg-red-500',
        !isVisible && 'opacity-0'
      )}
      style={{ transition: !isVisible ? `opacity ${fadeOutDuration}ms ease-out` : undefined }}
    >
      {showIcon && (
        <div className="flex-shrink-0 p-4 pl-4 py-4">
          <Icon size={24} className="text-white" />
        </div>
      )}
      <p className="flex-1 text-sm text-white text-center px-2 py-4">{children}</p>
      <button
        className="flex-shrink-0 bg-transparent border-none p-4 cursor-pointer text-white"
        onClick={() => onDismiss(id)}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
