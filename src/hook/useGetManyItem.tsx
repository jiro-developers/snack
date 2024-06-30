'use client';

import { useEffect, useState } from 'react';

import { Product } from '@/type/itemType';

type Props = {
  product: Product;
};

type Item = { alt: string; src: string };

/**
 * @todo react-query 적용 (캐싱 처리 적용)
 */
const useGetManyItem = ({ product }: Props) => {
  const [itemList, setItemList] = useState<Array<Item>>([]);

  useEffect(() => {
    const fetchItemList = async () => {
      const filePath = `/${product.toUpperCase()}.json`;

      try {
        const response = await fetch(filePath, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          cache: 'force-cache',
        });

        const jsonData = (await response.json()) as {
          [key in string]: Array<Item>;
        };

        const key = `${product.toUpperCase()}_DATA`;
        const fetchedItemList = jsonData[key];
        setItemList(fetchedItemList);
      } catch (error) {
        console.log(error);
        console.error(`error occured in fetchItemList: ${error}`);
      }
    };

    fetchItemList();
  }, [product]);

  return itemList;
};

export default useGetManyItem;
