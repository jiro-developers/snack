'use client'

import React, { useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

interface Props {
  portalId?: string;
  children?: React.ReactNode;
}

// * util component
export const Portal: React.FC<Props> = (props) => {
  const { portalId, children } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);

    if(portalId){
      ref.current = document.getElementById(portalId) as HTMLDivElement;
    }else{
      ref.current = document.createElement('div');
    }

    document.body.appendChild(ref.current);

    return () => {
      ref.current && document.body?.removeChild(ref.current);
    };
  }, []);

  if (!isMount) {
    return null;
  }

  return createPortal(children, ref.current as HTMLDivElement);
};
