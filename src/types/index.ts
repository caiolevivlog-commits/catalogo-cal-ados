export interface ProductReview {
  author: string;
  location: string;
  comment: string;
  rating: number;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'salto-bloco' | 'rasteira' | 'tenis' | 'outlet' | 'festa' | 'birken' | 'botinha' | 'mary-jane';
  groupName: string;
  reference: string;
  badge?: string;
  discountBadge?: string;
  subtag?: string;
  availableSizes: number[];
  originalPrice: number;
  shopeePrice: number;
  wholesalePrice: number;
  image: string;
  galleryImages: string[];
  shopeeUrl: string;
  soldCount: string;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  hasVideo?: boolean;
  videoUrl?: string;
  description: string;
  heelHeight?: string;
  insole?: string;
  material?: string;
  isOutlet?: boolean;
  isShopeeFeatured?: boolean;
  fixedBadge?: string;
}

export interface CartItem {
  id: string; // unique key combining product id and size
  product: Product;
  selectedSize: number;
  quantity: number;
}

export interface WholesaleLead {
  name: string;
  docNumber: string;
  phone: string;
  city: string;
  state: string;
  businessType: string;
  email?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  productTitle?: string;
  productImage?: string;
  shopeeUrl?: string;
  verifiedPurchase?: boolean;
}
