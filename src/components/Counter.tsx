import React from 'react';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';

export interface CounterProps {
  className?: string;
  value?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

export const Counter: React.FC<CounterProps> = (props) => {
  const { className, handleIncrease, handleDecrease, value, onDecrease, onIncrease } = props;

  return (
    <CounterWrap className={className}>
      <IconWrap
        onClick={() => {
          handleDecrease();
          onDecrease?.();
        }}
      >
        <Icon>
          <AiOutlineMinus />
        </Icon>
      </IconWrap>
      <CounterValue>{value}</CounterValue>
      <IconWrap
        onClick={() => {
          handleIncrease();
          onIncrease?.();
        }}
      >
        <Icon>
          <AiOutlinePlus />
        </Icon>
      </IconWrap>
    </CounterWrap>
  );
};

const CounterWrap = styled.div`
  display: flex;
  column-gap: 4px;
`;

const CounterValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #e3e5e8;
`;
const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 4px;
  border: 1px solid #e3e5e8;

  width: 32px;
  height: 32px;

  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;

  height: 100%;
`;
