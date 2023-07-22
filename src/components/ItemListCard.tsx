import React, { SetStateAction } from 'react';

import NextImage from 'next/image'
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';

import { Counter } from '@/components/Counter';
import { useCounter } from '@/hook/useCounter';
import { Item } from '@/type/itemType';

interface Props {
  product: Item;
  onClick: (id: string) => () => void;
  setSelectItem: React.Dispatch<SetStateAction<Item[]>>;
}

const ItemListCard: React.FC<Props> = (props) => {
  const { product, onClick, setSelectItem } = props;
  const { value, componentProps } = useCounter(1, { min: 1, max: Number.MAX_SAFE_INTEGER });

  const { type, item } = product;
  const replaceSlash = item.replaceAll('|', '/');
  const replaceSpace = replaceSlash.replaceAll(' ', '');

  const src = `/images/${type}/${replaceSpace}.jpg`;

  const handleIncrement = () => {
    setSelectItem((items) =>
      items.map((itemData) => {
        if (itemData.item === product.item) {
          return { ...itemData, quantity: itemData.quantity + 1 };
        }
        return itemData;
      })
    );
  };

  const handleDecrement = () => {
    setSelectItem((items) =>
      items.map((itemData) => {
        if (itemData.item === product.item && itemData.quantity > 1) {
          return { ...itemData, quantity: itemData.quantity - 1 };
        }
        return itemData;
      })
    );
  };

  return (
    <RootWrap>
      <CardWrap>
        <DivWrap>
          <Image src={src} alt={item} width={64} height={64}/>
          <Content>
            {item}
            {value > 1 && ` * ${value}`}
          </Content>
        </DivWrap>
        <DeleteIcon onClick={onClick(item)}>
          <AiOutlineClose size={'22px'} color={'#61666B'} />
        </DeleteIcon>
      </CardWrap>

      <Counter {...componentProps} handleIncrease={handleIncrement} handleDecrease={handleDecrement} />
    </RootWrap>
  );
};

export default ItemListCard;

const RootWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  margin: 20px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const CardWrap = styled.div`
  display: flex;
  justify-content: space-between;

  height: 64px;
  width: 100%;
`;

const DivWrap = styled.div`
  display: flex;
`;

const Image = styled(NextImage)`
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
  margin-left: 40px;

  width: 40px;
  height: 40px;

  padding: 8px;
`;
