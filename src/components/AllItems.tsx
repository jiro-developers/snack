'use client';
import React, { useState } from 'react';

import styled from 'styled-components';

import ItemListCard from '@/components/ItemListCard';
import Items from '@/components/Items';
import ToggleItem from '@/components/ToggleItem';

interface Props {
  snack: { alt: string; src: string }[];
  drink: { alt: string; src: string }[];
}

const AllItems = (props: Props) => {
  const { snack, drink } = props;
  const [itemList, setItemList] = useState<'snack' | 'drink'>('snack');
  const [selectItem, setSelectItem] = useState<string[]>([]);

  const items = itemList === 'snack' ? snack : drink;

  const copy = async () => {
    const selectedItemList = selectItem.join('\n');
    await navigator.clipboard.writeText(selectedItemList);

    alert('copy');
  };

  const deleteItem = (id: string) => {
    return () =>
      setSelectItem((itemList) => {
        return [...itemList.filter((item) => item !== id)];
      });
  };

  const allItems = [...snack, ...drink];

  return (
    <RootWrap>
      <DivWrap>
        <ToggleItem item={itemList} setItem={setItemList} />

        <Items items={items} selectItem={selectItem} setSelectItem={setSelectItem} />
      </DivWrap>

      <SelectList>
        <Title>주문 목록</Title>
        <List>
          {selectItem.map((item, index) => {
            return <ItemListCard items={allItems} item={item} onClick={deleteItem} key={index} />;
          })}
        </List>
        <CopyButtonWrap value="복사 하기" onClick={copy}>
          복사 하기
        </CopyButtonWrap>
      </SelectList>
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
