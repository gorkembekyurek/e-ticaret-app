export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
  tags?: string[];
  specifications?: { [key: string]: string };
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
} 