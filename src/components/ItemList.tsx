'use client';

import React, { useCallback } from 'react';

import NextImage from 'next/image';
import { AiOutlineCheck } from 'react-icons/ai';
import styled, { css } from 'styled-components';

import { useOrderContext } from '@/context/OrderContext';
import { useToastContext } from '@/context/toastContext';
import useGetManyItem from '@/hook/useGetManyItem';
import { Product } from '@/type/itemType';

import { colors } from '../../core/colors';
import { media } from '../../core/style.util/css.util';

interface ItemsProps {
  product: Product;
}

const ItemList: React.FC<ItemsProps> = ({ product }) => {
  const { selectedItemList, setSelectedItemList } = useOrderContext();
  const itemList = useGetManyItem({ product: product });
  const { createToast } = useToastContext();

  const handleSelectItem = useCallback(
    (clickedItem: string) => {
      setSelectedItemList((prevSelectedItem) => {
        const existingItemIndex = prevSelectedItem.findIndex((item) => item.item === clickedItem);

        if (existingItemIndex > -1) {
          const existingItem = prevSelectedItem[existingItemIndex];

          if (existingItem.quantity === 1) {
            return prevSelectedItem.filter((_, index) => index !== existingItemIndex);
          } else {
            createToast(`${clickedItem}는 이미 ${existingItem.quantity}개 선택되어 있습니다.`, 'error');
            return prevSelectedItem;
          }
        } else {
          return [...prevSelectedItem, { type: product, item: clickedItem, quantity: 1 }];
        }
      });
    },
    [setSelectedItemList, createToast, product]
  );

  return (
    <RootWrap>
      {itemList.map((item, index) => {
        const { alt } = item;
        const src = `/images/${product}/${alt.replaceAll('|', '/').replaceAll(' ', '')}.jpg`;
        const isSelected = !!selectedItemList.find(({ item }) => item === alt);

        return (
          <ItemWrap key={index} onClick={() => handleSelectItem(alt)}>
            <IconWrap $isSelected={isSelected}>{isSelected && <AiOutlineCheck color={colors.white} />}</IconWrap>
            <ImageWrap src={src} alt={alt} width={200} height={200} $isSelected={isSelected} />
            <Description>{alt}</Description>
          </ItemWrap>
        );
      })}
    </RootWrap>
  );
};

export default ItemList;

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

const IconWrap = styled.div<{ $isSelected?: boolean }>`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: ${({ $isSelected }) => ($isSelected ? 'none' : `1px solid ${colors.grey100}`)};
  background-color: ${({ $isSelected }) => ($isSelected ? colors.black : colors.white)};
`;

const ImageWrap = styled(NextImage)<{ $isSelected?: boolean }>`
  width: 200px;
  height: 200px;
  object-fit: contain;

  &:hover {
    border: 1px solid ${colors.grey100};
    border-radius: 8px;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border: 1px solid ${colors.black};
      border-radius: 8px;
      pointer-events: none;
    `};
`;

const ItemWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 268px;
  cursor: pointer;
`;

const Description = styled.div`
  margin-top: 16px;
`;
