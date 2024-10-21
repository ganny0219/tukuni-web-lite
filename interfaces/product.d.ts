export interface Product {
  [key: string]: any;
  id?: number;
  name: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  // category?: string;
  // supplier?: string;
  // variant?: string;
}
