// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { downloadImage, updateDirectory } = require('./util/util');

const json_file = '../public/SNACK.json';
const snack_directory = '../public/images/snack';

const snackDir = path.resolve(__dirname, snack_directory);

const json = fs.readFileSync(path.join(__dirname, json_file), 'utf8');

(async () => {
  try {
    const data = JSON.parse(json);
    const snackData = data.SNACK_DATA;

    updateDirectory(snackDir);

    for (const item of snackData) {
      if (item.src && item.alt) {
        const itemAlt = item.alt;

        const removeSlashItemAlt = itemAlt.replaceAll('/', '|');
        const fileName = (removeSlashItemAlt + '.jpg').replaceAll(' ', '');

        const destPath = path.join(__dirname, snack_directory, fileName);

        await downloadImage(item.src, destPath);
      }
    }

    console.log('음료 이미지 저장이 완료되었습니다.');
  } catch (error) {
    console.error('JSON 파싱 오류:', error);
  }
})();
