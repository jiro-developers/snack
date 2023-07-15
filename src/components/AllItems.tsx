'use client';
import React, { useState } from 'react';

import styled, { keyframes } from 'styled-components';

import ItemListCard from '@/components/ItemListCard';
import Items from '@/components/Items';
import TabItem from '@/components/TabItem';
import Toast from '@/components/Toast';
import { useToastContext } from '@/context/toastContext';
import { Item, Product } from '@/type/itemType';

interface Props {
  snack: { alt: string; src: string }[];
  drink: { alt: string; src: string }[];
}


const AllItems = (props: Props) => {

  const { snack, drink } = props;
  const [itemList, setItemList] = useState<Product>('snack');
  const [selectItem, setSelectItem] = useState<Item[]>([]);

  const { createToast, toasts } = useToastContext();

  const items = itemList === 'snack' ? snack : drink;

  const copy = async () => {
    const selectedItemList = selectItem
      .map(({ item, quantity }) => {
        return `${item} * ${quantity}`;
      })
      .join('\n');

    await navigator.clipboard.writeText(selectedItemList);

    createToast('복사가 완료 되었습니다', 'success');

    alert('copy');
  };

  const deleteItem = (id: string) => {
    return () =>
      setSelectItem((itemList) => {
        return [...itemList.filter(({ item }) => item !== id)];
      });
  };

  return (
    <RootWrap>
      <DivWrap>
        <TabItem item={itemList} setItem={setItemList} />

        <Items itemStatus={itemList} items={items} selectItem={selectItem} setSelectItem={setSelectItem} />
      </DivWrap>

      <SelectList>
        <Title>주문 목록</Title>
        <List>
          {selectItem.map((product, index) => {
            return <ItemListCard product={product} onClick={deleteItem} setSelectItem={setSelectItem} key={index} />;
          })}
        </List>
        <CopyButtonWrap value="복사하기" onClick={copy}>
          복사하기
        </CopyButtonWrap>
      </SelectList>
      {/* TODO 후에 포탈로 변경*/}
      <ToastWrap>
        {toasts.map((toast) => {
          return (
            <ToastListWrap key={toast.id}>
              <Toast id={toast.id} variant={toast.variant}>
                {toast.message}
              </Toast>
            </ToastListWrap>
          );
        })}
      </ToastWrap>
    </RootWrap>
  );
};

export default AllItems;

const RootWrap = styled.div`
  display: flex;
  flex: 1;
`;

const DivWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  column-gap: 40px;
`;

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
`;

const Title = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 20px;
  font-weight: 700;
  line-height: 100%;

  height: 68px;
  width: 100%;
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

  color: #fff;
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
  top: calc(68px + 40px);
  height: calc(100% - 68px - 40px - 68px);
  overflow-y: scroll;
  padding: 0 32px;
  width: 400px;
  min-width: 320px;
  max-width: 400px;
`;

const ToastWrap = styled.div`
  position: fixed;
  left: 50%;
  top: 20px;
  z-index: 1;
  transform: translateX(-50%);
`;

const toast = keyframes`
  from {
    transform: translateY(calc(-100% - 20px));
  }
`;

const ToastListWrap = styled.div`
  animation: ${toast} 800ms cubic-bezier(0, 0.46, 0, 1.04) both;
  will-change: transform;
`;
