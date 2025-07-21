// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const https = require('https');

const downloadImage = async (src, path) => {
  return new Promise((resolve, reject) => {
    const imageFile = fs.createWriteStream(path);
    https.get(src, (response) => {
      response.pipe(imageFile);
      response.on('end', resolve);
      response.on('error', reject);
    });
  });
};

const updateDirectory = (dir) => {
  const hasDirectory = fs.existsSync(dir);

  if (hasDirectory) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`${dir} 폴더를 삭제했습니다.`);
  }

  fs.mkdirSync(dir);
  console.log(`${dir} 폴더를 생성했습니다.`);
};

const sanitizeFilename = (altText, usedNames = new Set()) => {
  // Remove capacity information (text in parentheses)
  let cleanName = altText.replace(/\([^)]*\)/g, '');
  
  // Remove special characters that cause issues with URLs/file systems
  // Keep Korean characters, numbers, letters, and basic safe characters
  cleanName = cleanName.replace(/[%()[\]{}|\\/:*?"<>]/g, '');
  
  // Remove extra spaces and trim
  cleanName = cleanName.replace(/\s+/g, '').trim();
  
  // Handle duplicate names
  let finalName = cleanName;
  let counter = 1;
  
  while (usedNames.has(finalName)) {
    finalName = `${cleanName}_${counter}`;
    counter++;
  }
  
  usedNames.add(finalName);
  return finalName;
};

module.exports = {
  downloadImage,
  updateDirectory,
  sanitizeFilename,
};
