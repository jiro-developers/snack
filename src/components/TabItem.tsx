'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

import { Product } from '@/type/itemType';

import { colors } from '../../core/colors';

interface Props {
  item: Product;
}

const TabItem: React.FC<Props> = (props) => {
  const { item } = props;
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});

  const isSnackClicked = item === 'snack';
  const isDrinkClicked = item === 'drink';

  useEffect(() => {
    const handleScroll = () => {
      setScrollPositions((prevPositions) => ({
        ...prevPositions,
        [item]: window.scrollY,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [item]);

  useEffect(() => {
    window.scrollTo(0, scrollPositions[item] || 0);
  }, [item, scrollPositions]);

  return (
    <RootWrap>
      <Link href={`/order/snack`}>
        <ButtonWrap value="과자" $isClicked={isSnackClicked}>
          과자
        </ButtonWrap>
      </Link>
      <Link href={`/order/drink`}>
        <ButtonWrap value="음료" $isClicked={isDrinkClicked}>
          음료
        </ButtonWrap>
      </Link>
    </RootWrap>
  );
};

export default TabItem;

const RootWrap = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  height: 68px;
  border-bottom: 1px solid #eef0f1;
  z-index: 1;

  > a {
    width: 100%;
  }
`;

const ButtonWrap = styled.button<{ $isClicked: boolean }>`
  padding: 0;
  border: none;
  width: 100%;
  height: 100%;
  background-color: ${({ $isClicked }) => ($isClicked ? '#fff' : '#f3f5f7')};

  font-size: 20px;
  font-weight: ${({ $isClicked }) => ($isClicked ? '800' : '600')};
  pointer-events: ${({ $isClicked }) => ($isClicked ? 'none' : 'auto')};
  -webkit-tap-highlight-color: transparent;
  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #f9fafb;
    color: ${colors.grey600};
    font-weight: 700;
  }

  cursor: pointer;
`;
