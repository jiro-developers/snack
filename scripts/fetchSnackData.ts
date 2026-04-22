import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const API_BASE = 'https://api.wefun.kr/snack/app/v1';
const SERVICE_ID = 'mYMkPaGIPATDGbMWjsDEYA%3D%3D';

const COMMON_HEADERS = {
  client_id: 'wefun',
  client_secret: 'SMvRCdCzQGaMpGEKBn18GA9aKJkAgXy6',
  branch_encrypted: 'LWKNIAXBhJ1QB6B1ej218w%3D%3D',
  company_member_encrypted: 'Md2LadOxL7RgVPzb9B2uLA%3D%3D',
  origin: 'https://app.snack24h.com',
  referer: 'https://app.snack24h.com/',
};

interface Category {
  code: string;
  type: string;
  name: string;
  typeName: string;
  displayYN: string;
}

interface Item {
  alt: string;
  src: string;
  localFilename: string;
  category: string;
  categoryName: string;
  price: number;
}

const sanitizeFilename = (altText: string, usedNames = new Set<string>()): string => {
  let cleanName = altText.replace(/\([^)]*\)/g, '');
  cleanName = cleanName.replace(/[%()[\]{}|\\/:*?"<>]/g, '');
  cleanName = cleanName.replace(/\s+/g, '').trim();

  let finalName = cleanName;
  let counter = 1;

  while (usedNames.has(finalName)) {
    finalName = `${cleanName}_${counter}`;
    counter++;
  }

  usedNames.add(finalName);
  return finalName;
};

const login = async (): Promise<string> => {
  const response = await axios.post(`${API_BASE}/auth/login`, {
    serviceList: [{ id: SERVICE_ID, serviceType: '스낵24' }],
    apiClient: { clientId: 'wefun', clientSecret: 'SMvRCdCzQGaMpGEKBn18GA9aKJkAgXy6' },
  });
  return response.data?.token ?? '';
};

const fetchCategories = async (type: 'AA' | 'BB'): Promise<Category[]> => {
  const response = await axios.get(`${API_BASE}/item/category/sub?type=${type}`, {
    headers: COMMON_HEADERS,
  });
  return response.data?.list ?? [];
};

const fetchItems = async (itemCategory: 'AA' | 'BB'): Promise<any[]> => {
  const response = await axios.get(
    `${API_BASE}/item/search/${SERVICE_ID}?itemCategory=${itemCategory}&limit=999&page=1`,
    {
      headers: COMMON_HEADERS,
    }
  );
  return response.data?.list ?? [];
};

const buildItems = (rawItems: any[], categories: Category[]): Item[] => {
  const usedNames = new Set<string>();
  return rawItems.map((item) => {
    // itemCategory can be a string code or an object {code, type, typeName}
    const rawCat = item.itemCategory;
    const catCode: string = typeof rawCat === 'string' ? rawCat
      : (rawCat?.code ?? '');
    const category = categories.find((c) => c.code === catCode) ?? {
      code: catCode,
      name: '',
    };
    const alt: string = item.itemName ?? item.name ?? '';
    const src: string = item.itemImageUrl ?? item.imageUrl ?? item.src ?? '';
    const price: number = item.eventDiscountPrice ?? item.itemPrice ?? item.price ?? 0;
    return {
      alt,
      src,
      localFilename: sanitizeFilename(alt, usedNames) + '.jpg',
      category: category.code,
      categoryName: category.name,
      price,
    };
  });
};

const writeJson = (filePath: string, data: unknown): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`저장 완료: ${filePath}`);
};

const main = async (): Promise<void> => {
  const publicDir = path.resolve(__dirname, '..', 'public');

  // 카테고리 조회
  let snackCategories: Category[] = [];
  let drinkCategories: Category[] = [];
  try {
    [snackCategories, drinkCategories] = await Promise.all([
      fetchCategories('AA'),
      fetchCategories('BB'),
    ]);
    console.log(`스낵 카테고리 ${snackCategories.length}개, 음료 카테고리 ${drinkCategories.length}개 조회 완료`);
  } catch (err) {
    console.error('카테고리 조회 실패:', err);
    process.exit(0);
  }

  // 상품 전체 조회
  let rawSnacks: any[] = [];
  let rawDrinks: any[] = [];
  try {
    [rawSnacks, rawDrinks] = await Promise.all([
      fetchItems('AA'),
      fetchItems('BB'),
    ]);
    console.log(`스낵 ${rawSnacks.length}개, 음료 ${rawDrinks.length}개 조회 완료`);
  } catch (err) {
    console.error('상품 조회 실패:', err);
    process.exit(0);
  }

  const snackItems = buildItems(rawSnacks, snackCategories);
  const drinkItems = buildItems(rawDrinks, drinkCategories);

  try {
    writeJson(path.join(publicDir, 'SNACK.json'), { SNACK_DATA: snackItems });
    writeJson(path.join(publicDir, 'DRINK.json'), { DRINK_DATA: drinkItems });
    writeJson(path.join(publicDir, 'CATEGORIES.json'), {
      snack: snackCategories.map(({ code, name, type }) => ({ code, name, type })),
      drink: drinkCategories.map(({ code, name, type }) => ({ code, name, type })),
    });
  } catch (err) {
    console.error('파일 저장 실패:', err);
    process.exit(0);
  }

  console.log('데이터 수집 완료');
};

main();
