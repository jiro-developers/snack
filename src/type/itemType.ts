export type Item = {
  type: Product;
  item: string;
  quantity: number;
  localFilename: string;
  imageSrc?: string;
  price?: number;
};

export type Product = 'snack' | 'drink';

export interface ItemData {
  alt: string;
  src: string;
  localFilename: string;
  category?: string;
  categoryName?: string;
  price?: number;
}

export type Category = {
  code: string;
  name: string;
  type: string;
  displayYN?: string;
};

export type CategoriesData = {
  snack: Category[];
  drink: Category[];
};
