import React from 'react';

import * as fs from 'fs';
import path from 'path';

import AllItems from '@/components/AllItems';
import { CategoriesData, ItemData } from '@/type/itemType';

interface AllItemsType {
  DRINK_DATA: ItemData[];
  SNACK_DATA: ItemData[];
}

const getFetchJSONData = async (filePath: string): Promise<AllItemsType> => {
  const jsonData = await fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
};

const getCategoriesData = (filePath: string): CategoriesData | undefined => {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch {
    return undefined;
  }
};

export default async function Home() {
  const drinkFilePath = path.join(process.cwd(), 'public', 'DRINK.json');
  const snackFilePath = path.join(process.cwd(), 'public', 'SNACK.json');
  const categoriesFilePath = path.join(process.cwd(), 'public', 'CATEGORIES.json');

  const [DRINK, SNACK] = await Promise.all([
    getFetchJSONData(drinkFilePath),
    getFetchJSONData(snackFilePath),
  ]);

  const categories = getCategoriesData(categoriesFilePath);

  return (
    <main>
      <AllItems snack={SNACK.SNACK_DATA} drink={DRINK.DRINK_DATA} categories={categories} />
    </main>
  );
}
