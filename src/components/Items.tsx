import React, { SetStateAction } from 'react';

import styled from 'styled-components';

interface Props {
  items: {
    alt: string;
    src: string;
  }[];
  setSelectItem: React.Dispatch<SetStateAction<string[]>>;
  selectItem: string[];
}

const Items: React.FC<Props> = (props) => {
  const { items, selectItem, setSelectItem } = props;

  const handleSelectItem = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedItem = event.currentTarget.textContent as string;

    setSelectItem((prev) => {
      if (prev.includes(clickedItem)) {
        return prev;
      }

      return [...prev, clickedItem];
    });
  };

  return (
    <RootWrap>
      {items.map((item, index) => {
        const { src, alt } = item;
        const isSelected = selectItem.includes(item.alt);

        return (
          <ItemWrap key={index} onClick={handleSelectItem}>
            <DivWrap $isSelected={isSelected} />
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
`;

const ItemWrap = styled.div`
  position: relative;
  display: flex;
  column-gap: 16px;
  flex-direction: column;
  width: 200px;
  height: 268px;

  cursor: pointer;
`;

const DivWrap = styled.div<{ $isSelected: boolean }>`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;

  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: ${({ $isSelected }) => ($isSelected ? 'rgb(97, 67, 255)' : '#fff')};
`;

const ImageWrap = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const Discription = styled.div``;
