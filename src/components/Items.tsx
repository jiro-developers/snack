'use client';
import React, { SetStateAction } from 'react';

import NextImage from 'next/image';
import { AiOutlineCheck } from 'react-icons/ai';
import styled, { css } from 'styled-components';

import { Item, Product } from '@/type/itemType';

import { colors } from '../../core/colors';
import { media } from '../../core/style.util/css.util';


interface Props {
  itemStatus: Product;
  items: {
    alt: string;
    src: string;
  }[];
  setSelectItem: React.Dispatch<SetStateAction<Item[]>>;
  selectItem: Item[];
}

const Items: React.FC<Props> = (props) => {
  const { itemStatus, items, selectItem, setSelectItem } = props;

  const handleSelectItem = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedItem = event.currentTarget.textContent as string;

    setSelectItem((prev) => {
      const hasItems = prev.find(({ item }) => item === clickedItem);
      if (hasItems) {
        return prev;
      }

      return [...prev, { type: itemStatus, item: clickedItem, quantity: 1 }];
    });
  };

  return (
    <RootWrap>
      {items.map((item, index) => {
        const { alt } = item;

        const replaceSlash = alt.replaceAll('|', '/');
        const replaceSpace = replaceSlash.replaceAll(' ', '');

        const src = `/images/${itemStatus}/${replaceSpace}.jpg`;

        const isSelected = selectItem.find(({ item }) => item === alt);

        return (
          <ItemWrap key={index} onClick={handleSelectItem} isSelected={isSelected}>

            <IconWrap isSelected={isSelected}>
              {isSelected && <AiOutlineCheck color={colors.white} />}
            </IconWrap>
            <ImageWrap src={src} alt={alt} width={200} height={200} isSelected={isSelected} />

            <Description>{alt}</Description>
          </ItemWrap>
        );
      })}
    </RootWrap>
  );
};
export default Items;

const RootWrap = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;

  margin-top: 20px;
  padding: 0 28px;

  ${media.tablet} {
    gap: 40px;
  }
`;



const IconWrap = styled.div<{ isSelected?: Item }>`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  border-radius: 8px;
  
  border: ${({ isSelected }) => (isSelected ? 'none' : `1px solid ${colors.grey100}`)};

  background-color: ${({ isSelected }) => (isSelected ? colors.black : colors.white)};
`;

const ImageWrap = styled(NextImage)<{ isSelected?: Item }>`
  width: 200px;
  height: 200px;
  object-fit: contain;

  &:hover {
    border: 1px solid ${colors.grey100};
    border-radius: 8px;
  }

  ${({ isSelected }) =>
          isSelected &&
          css`
            border: 1px solid ${colors.black};
            border-radius: 8px;
            pointer-events: none;
          `};
`;

const ItemWrap = styled.div<{ isSelected?: Item }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 268px;
  
  cursor: pointer;
  pointer-events: ${({ isSelected }) => (isSelected ? 'none' : 'auto')};
  
  &:hover{
    ${IconWrap}{
      background: ${colors.grey025};
    }
  }
`;

const Description = styled.div`
  margin-top: 16px;
`;
