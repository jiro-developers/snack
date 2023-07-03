'use client';
import React, { SetStateAction } from 'react';

import { AiOutlineCheck } from 'react-icons/ai';
import styled from 'styled-components';

import { Item, Product } from '@/type/itemType';

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
          <ItemWrap key={index} onClick={handleSelectItem}>
            {isSelected && (
              <DivWrap>
                <AiOutlineCheck color={'rgb(97, 67, 255)'} />
              </DivWrap>
            )}
            <ImageWrap src={src} alt={alt} />
            <Discription>{alt}</Discription>
          </ItemWrap>
        );
      })}
    </RootWrap>
  );
};
export default Items;

const RootWrap = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;

  margin-top: 20px;
`;

const ItemWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 268px;

  cursor: pointer;
`;

const DivWrap = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid rgb(97, 67, 255);
  background-color: #fff;
`;

const ImageWrap = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const Discription = styled.div`
  margin-top: 16px;
`;
