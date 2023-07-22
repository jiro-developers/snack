// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cheerio = require('cheerio');

//TODO 파일 정리 하기.
const convertHTMLtoJSON = (html) =>{
  const $ = cheerio.load(html);
  const images = [];

  $('.thumb img').each((index, element) => {
    const img = $(element);
    const alt = img.attr('alt');
    const src = img.attr('src');

    images.push({ alt, src });
  });

  return images;
}

const readFileAsync = async (filePath, encoding) => {
  return await fs.readFile(filePath, encoding);
};

const createJSONFile = async (filePath, data) => {
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonData);
};

(async () => {
  try {
    const drinkFilePath = path.join(__dirname, '../public', 'drink.txt');
    const drinkHtml = await readFileAsync(drinkFilePath, 'utf8');

    const drinkImagesJSON = convertHTMLtoJSON(drinkHtml);
    const drinkData = { 'DRINK_DATA': drinkImagesJSON };
    await createJSONFile(path.join(__dirname, '../public', 'DRINK.json'), drinkData);

    const snackFilePath = path.join(__dirname, '../public', 'snack.txt');
    const snackHtml = await readFileAsync(snackFilePath, 'utf8');

    const snackImagesJSON = convertHTMLtoJSON(snackHtml);
    const snackData = { 'SNACK_DATA': snackImagesJSON };
    await createJSONFile(path.join(__dirname, '../public', 'SNACK.json'), snackData);

    console.log('변환 완료 응애');
  } catch (error) {
    console.error('Error:', error);
  }
})();