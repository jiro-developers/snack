// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { downloadImage, updateDirectory } = require('./util/util');

const json_file = '../public/DRINK.json';
const drink_directory = '../public/images/drink';

const drinkDir = path.resolve(__dirname, drink_directory);

const json = fs.readFileSync(path.join(__dirname, json_file), 'utf8');

(async () => {
  try {
    const data = JSON.parse(json);
    const drinkData = data.DRINK_DATA;

    updateDirectory(drinkDir);

    for (const item of drinkData) {
      if (item.src && item.localFilename) {
        const destPath = path.join(__dirname, drink_directory, item.localFilename);

        await downloadImage(item.src, destPath);
      }
    }

    console.log('음료 이미지 저장이 완료되었습니다.');
  } catch (error) {
    console.error('JSON 파싱 오류:', error);
  }
})();
