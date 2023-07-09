import React, { useEffect } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi';
import styled, { css } from 'styled-components';

import { ToastVariantType, useToastContext } from '@/context/toastContext';

const ICONS_BY_VARIANT = {
  success: BiCheckCircle,
  error: BiErrorCircle,
};

interface Props {
  id: string;
  variant: ToastVariantType;
  children: React.ReactNode;
  showIcon?: boolean;
}

const Toast: React.FC<Props> = (props) => {
  const { id, variant, children, showIcon = false } = props;
  const { dismissToast } = useToastContext();
  const Icon = ICONS_BY_VARIANT[variant];

  useEffect(() => {
    const setTime = setTimeout(() => {
      dismissToast(id);
    }, 3000);

    return () => clearTimeout(setTime);
  }, [dismissToast, id]);

  return (
    <ToastWrap variant={variant}>
      {showIcon && (
        <IconWrap>
          <Icon size={24} />
        </IconWrap>
      )}
      <Content variant={variant}>{children}</Content>
      <CloseButton onClick={() => dismissToast(id)}>
        <AiOutlineClose size={18} />
      </CloseButton>
    </ToastWrap>
  );
};

export default Toast;

const ToastWrap = styled.div<{ variant: ToastVariantType }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color-scheme: light;
  max-width: 100%;
  width: 312px;
  margin: 16px 0;

  ${({ variant }) => {
    switch (variant) {
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
