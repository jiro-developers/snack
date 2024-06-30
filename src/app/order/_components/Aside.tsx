'use client';

import React from 'react';

import { colors } from '@core/colors';
import styled from 'styled-components';

import ItemListCard from '@/components/ItemListCard';
import { useOrderContext } from '@/context/OrderContext';
import { useToastContext } from '@/context/toastContext';

const Aside = () => {
  const { selectedItemList, setSelectedItemList } = useOrderContext();
  const { createToast } = useToastContext();

  const copy = async () => {
    const text = selectedItemList
      .map(({ item, quantity }) => {
        return `${item} * ${quantity}`;
      })
      .join('\n');

    await navigator.clipboard.writeText(text);

    createToast('주문 목록을 복사했어요.', 'success', 3000, 300);
  };

  const deleteItem = (id: string) => {
    return () =>
      setSelectedItemList((itemList) => {
        return [...itemList.filter(({ item }) => item !== id)];
      });
  };

  return (
    <SelectList>
      <Title>주문 목록</Title>
      <List>
        {selectedItemList.map((product, index) => {
          return <ItemListCard product={product} onClick={deleteItem} setSelectedItemList={setSelectedItemList} key={index} />;
        })}
      </List>
      <CopyButtonWrap onClick={copy}>복사하기</CopyButtonWrap>
    </SelectList>
  );
};

export default Aside;

const SelectList = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex: 1;
  min-width: 320px;

  max-width: 400px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-left: 1px solid ${colors.grey400};
`;

const Title = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: left;

  padding-left: 32px;
  color: ${colors.grey300};
  font-size: 20px;
  font-weight: 700;
  line-height: 100%;
  width: 100%;

  padding-top: 32px;
  padding-bottom: 24px;
`;

const CopyButtonWrap = styled.button`
  position: sticky;

  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  width: 100%;

  padding: 24px 0px;

  color: ${colors.white};
  background-color: black;
  font-size: 20px;
  font-weight: 700;
  line-height: 100%;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }
`;

const List = styled.div`
  position: fixed;
  top: calc(56px + 20px);
  height: calc(100% - 56px - 20px - 68px);
  overflow-y: scroll;
  padding: 0 32px 32px;
  width: 400px;
  min-width: 320px;
  max-width: 400px;
`;
