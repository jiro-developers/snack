import React from 'react';

import styled from 'styled-components';

import { Counter } from '@/components/Counter';
import { useCounter } from '@/hook/useCounter';

interface Props {
  items: {
    alt: string;
    src: string;
  }[];
  item: string;
  onClick: (id: string) => () => void;
}

const ItemListCard: React.FC<Props> = (props) => {
  const { items, item, onClick } = props;
  const { value, componentProps } = useCounter(1, { min: 1, max: Number.MAX_SAFE_INTEGER });

  const images = items.find((list) => {
    const { alt } = list;

    return alt === item;
  });

  return (
    <RootWrap>
      <CardWrap>
        <Image src={images?.src} alt={images?.alt} />
        <Content>
          <span>{item}</span> {value > 1 && <span>* {value}</span>}
        </Content>

        <DeleteIcon onClick={onClick(item)}>X</DeleteIcon>
      </CardWrap>
      <Counter {...componentProps} />
    </RootWrap>
  );
};

export default ItemListCard;

const RootWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  column-gap: 16px;

  margin: 20px 0;
`;

const CardWrap = styled.div`
  display: flex;

  height: 64px;
  width: 100%;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
`;

const Content = styled.div`
  display: flex;
  align-items: center;

  color: #000;
  font-size: 16px;
  line-height: 160%;

  margin-left: 12px;
`;

const DeleteIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding: 8px;

  border: 1px solid grey;
  width: 20px;
  height: 20px;
  border-radius: 4px;
`;
