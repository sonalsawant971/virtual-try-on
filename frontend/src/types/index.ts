export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'tshirt' | 'jeans' | 'jacket' | 'dress' | 'shirt';
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  material: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface UserMeasurements {
  height: number;
  weight: number;
  bodyType: 'slim' | 'regular' | 'athletic' | 'plus';
}

export interface SizeRecommendation {
  size: string;
  confidence: number;
  reason: string;
}

export interface TryOnResult {
  imageUrl: string;
  productId: string;
}

