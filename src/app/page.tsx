import React from 'react';

import AllItems from '@/components/AllItems';
import { axiosInstance } from '@/util/axiosInstance';

export default async function Home() {
  const { data: DRINK } = await axiosInstance.get('http://localhost:3000/DRINK.json');
  const { data: SNACK } = await axiosInstance.get('http://localhost:3000/SNACK.json');

  return (
    <main>
      <AllItems snack={SNACK.SNACK_DATA} drink={DRINK.DRINK_DATA} />
    </main>
  );
}
