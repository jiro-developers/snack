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

  // 첫 상품이 가지고 있는 카드 class
  const newFormatCards = $('.flex.h-fit.w-60.flex-col.items-center.gap-3.p-3');

  if (newFormatCards.length > 0) {
    newFormatCards.each((index, element) => {
      const card = $(element);

      // Find the main product image (first img that's not an icon)
      const img = card.find('img').first();
      const src = img.attr('src');

      if (src && !src.includes('icon-category')) {
        const cardChildren = card.children();

        const imageContainer = cardChildren.eq(0);
        const orderUnit = imageContainer.find('div').last().find('span').text().trim();

        const productDetails = cardChildren.eq(2);
        const productInfoDiv = productDetails.children().eq(1).children().eq(0);
        const productName = productInfoDiv.children().eq(0).text().trim();
        const capacity = productInfoDiv.children().eq(1).children().eq(0).text().trim();

        // Construct alt text - only include "개 묶음" if orderUnit has a valid value
        const constructedAlt = orderUnit
          ? `${orderUnit}개 묶음 ${productName} (${capacity})`.trim()
          : `${productName} (${capacity})`.trim();

        images.push({ alt: constructedAlt, src });
      }
    });
  } else {
    // Handle old format
    $('.thumb img').each((index, element) => {
      const img = $(element);
      const src = img.attr('src');

      if (src) {
        // Get item details from the old format
        const itemUnit = img.closest('.item-box').find('.item-unit').text().trim();
        const itemName = img.closest('.item-box').find('.item-name').text().trim();
        const itemCapacity = img.closest('.item-box').find('.item-capacity').text().trim();

        const constructedAlt = `${itemUnit} ${itemName} ${itemCapacity}`.trim();

        images.push({ alt: constructedAlt, src });
      }
    });
  }

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