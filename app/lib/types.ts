export interface Variant {
  id: string;
  size: string;
  color: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  variants: Variant[];
}
