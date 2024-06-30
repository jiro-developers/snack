'use client';

import React, { ReactNode } from 'react';

import styled from 'styled-components';

import { Portal } from '@/components/Portal';
import Toast from '@/components/Toast';
import { OrderProvider } from '@/context/OrderContext';
import { useToastContext } from '@/context/toastContext';

import Aside from './_components/Aside';

const Layout = ({ children }: { children: ReactNode }) => {
  const { toasts, dismissToast } = useToastContext();

  return (
    <>
      <main>
        <RootWrap>
          <OrderProvider>
            <DivWrap>{children}</DivWrap>
            <Aside />
          </OrderProvider>

          <Portal portalId="toast">
            <ToastWrap>
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  id={toast.id}
                  variant={toast.variant}
                  onDismiss={dismissToast}
                  duration={toast.duration}
                  fadeOutDuration={toast.fadeOutDuration}
                >
                  {toast.message}
                </Toast>
              ))}
            </ToastWrap>
          </Portal>
        </RootWrap>
      </main>
      <div id="toast" />
    </>
  );
};

export default Layout;

const RootWrap = styled.div`
  display: flex;
  flex: 1;
`;

const DivWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  column-gap: 40px;
`;

const ToastWrap = styled.div`
  position: fixed;
  left: 50%;
  top: 20px;
  z-index: 1;
  transform: translateX(-50%);
`;
