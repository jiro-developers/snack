import fs from 'fs';
import path from 'path';

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type DrinkData = {
  alt: string;
  src: string;
};

export default async function GET() {
  const filePath = path.join(process.cwd(), 'public/SNACK.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const { DRINK_DATA }: { DRINK_DATA: DrinkData[] } = JSON.parse(jsonData);
    return DRINK_DATA;
    for (const drink of DRINK_DATA) {
      const imageResponse = await axios.get(drink.src, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(imageResponse.data, 'binary');
      const imagePath = path.join(process.cwd(), 'public/images', `${getImageFilename(drink.src)}`);

      fs.writeFileSync(imagePath, imageBuffer);
    }

    return 'data';
  } catch (error) {
    console.error('JSON 파일 처리 중 오류가 발생했습니다:', error);
    return new Response('Bad Request', { status: 500 });
  }
}

function getImageFilename(url: string) {
  const filename = url.split('/').pop();
  if (!filename) {
    throw new Error('유효하지 않은 이미지 URL입니다');
  }
  return filename;
}
