export type Item = {
  type: Product;
  item: string;
  quantity: number;
};

export type Product = 'snack' | 'drink';

export interface ItemData {
  alt: string;
  src: string;
  localFilename: string;
}
