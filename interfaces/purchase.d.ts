export interface Purchase {
  id?: number;
  productName: string;
  productId?: number;
  price: number;
  quantity: number;
  name: string;
  image: string;
}

export interface ProductPurchase {
  productId?: number;
  productName: string;
  price: number;
  quantity: number;
}
