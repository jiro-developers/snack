import fs from 'fs';
import path from 'path';

import axios from 'axios';

import { axiosInstance } from '@/util/axiosInstance';

export const saveImages = async () => {
  // try {
  // 이미지 URL이 포함된 JSON 데이터 가져오기
  const jsonData = await fetch('/DRINK_JSON_FILE.json');
  console.log(jsonData);
  // 이미지 저장 로직

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  //   for (const item of jsonData.items) {
  //     const imageUrl = item.image;
  //     const imageName = `image-${item.alt}.jpg`;
  //     const imagePath = path.join(process.cwd(), 'public/images', imageName);
  //
  //     const response = await axios({
  //       url: imageUrl,
  //       method: 'GET',
  //       responseType: 'stream',
  //     });
  //
  //     response.data.pipe(fs.createWriteStream(imagePath));
  //
  //     await new Promise((resolve, reject) => {
  //       response.data.on('end', resolve);
  //       response.data.on('error', reject);
  //     });
  //   }
  //
  //   console.log('Images saved successfully');
  // } catch (error) {
  //   console.error('Error occurred while saving images:', error);
  // }
  // }
};
