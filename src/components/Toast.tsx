import React, { useEffect, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';
import styled, { css, keyframes } from 'styled-components';

import { ToastVariantType } from '@/context/toastContext';

const ICONS_BY_VARIANT = {
  success: BiCheckCircle,
  error: BiErrorCircle,
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
    <ToastWrap $variant={variant} $isVisible={isVisible} $fadeOutDuration={fadeOutDuration}>
      {showIcon && (
        <IconWrap>
          <Icon size={24} />
        </IconWrap>
      )}
      <Content variant={variant}>{children}</Content>
      <CloseButton onClick={() => onDismiss(id)}>
        <AiOutlineClose size={18} />
      </CloseButton>
    </ToastWrap>
  );
};

export default Toast;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const ToastWrap = styled.div<{ $variant: ToastVariantType; $isVisible: boolean; $fadeOutDuration: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color-scheme: light;
  max-width: 100%;
  width: 312px;
  margin: 16px 0;
  animation: ${({ $isVisible, $fadeOutDuration }) =>
          !$isVisible
                  ? css`
          ${fadeOut} ${$fadeOutDuration}ms ease-out forwards
        `
                  : 'none'};

  ${({ $variant }) => {
    switch ($variant) {
      case 'success': {
        return css`
          background-color: black;
        `;
      }
      case 'error': {
        return css`
          background-color: red;
        `;
      }
    }
  }}
`;
const Content = styled.p<{ variant: ToastVariantType }>`
  flex: 1;
  font-size: 14px;
  color: white;
  text-align: center;
`;

const IconWrap = styled.div`
  flex-shrink: 0;
  padding: 16px 0px 16px 16px;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  border: none;
  background: transparent;
  padding: 16px;
  cursor: pointer;

  color: white;
`;
