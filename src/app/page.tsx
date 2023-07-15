import React from 'react';

import * as fs from 'fs';
import path from 'path';

import AllItems from '@/components/AllItems';

interface AllItemsType {
  DRINK_DATA: Item[];
  SNACK_DATA: Item[];
}

interface Item {
  alt: string;
  src: string;
}

const getFetchJSONData = async(filePath: string): Promise<AllItemsType> =>{
  const jsonData = await fs.readFileSync(filePath, "utf-8");

  return JSON.parse(jsonData);
}

export default async function Home() {


  const drinkFilePath = path.join(process.cwd(), 'public', 'DRINK.json');
  const snackFilePath = path.join(process.cwd(), 'public', 'SNACK.json');

  const [DRINK, SNACK] = await Promise.all([
    getFetchJSONData(drinkFilePath),
    getFetchJSONData(snackFilePath),
  ]);


  return (
    <main>
      <AllItems snack={SNACK.SNACK_DATA} drink={DRINK.DRINK_DATA} />
    </main>
  );
}
