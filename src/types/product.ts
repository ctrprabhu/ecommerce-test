export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  specs: Record<string, string>;
  stock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  new?: boolean;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: Category[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}
