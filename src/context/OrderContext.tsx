'use client';
import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

import { Item } from '@/type/itemType';

type OrderContextProps = {
  selectedItemList: Array<Item>;
  setSelectedItemList: Dispatch<SetStateAction<Array<Item>>>;
};

const OrderContext = createContext<OrderContextProps>({
  selectedItemList: [],
  setSelectedItemList: () => void 0,
});

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItemList, setSelectedItemList] = useState<Array<Item>>([]);

  return <OrderContext.Provider value={{ selectedItemList, setSelectedItemList }}>{children}</OrderContext.Provider>;
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
