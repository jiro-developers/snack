export type Item = {
  type: Product;
  item: string;
  quantity: number;
  localFilename: string;
};

export type Product = 'snack' | 'drink';

export interface ItemData {
  alt: string;
  src: string;
  localFilename: string;
}
