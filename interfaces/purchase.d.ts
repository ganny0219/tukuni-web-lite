export interface Purchase {
  id?: number;
  productId?: number;
  price: number;
  quantity: number;
  name: string;
  image: string;
}

export interface ProductPurchase {
  productId?: number;
  name: string;
  price: number;
  quantity: number;
}
