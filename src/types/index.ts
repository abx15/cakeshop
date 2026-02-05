export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: 'cake' | 'pastry' | 'cupcake' | 'brownie' | 'cookie';
  images: string[];
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  sizes: { weight: string; price: number }[];
  flavors: string[];
  shapes?: string[];
  dietary: ('eggless' | 'vegan' | 'sugar-free' | 'gluten-free')[];
  ingredients: string[];
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  customizable: boolean;
  deliveryTime: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
  photos?: string[];
  title?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  size: string;
  flavor: string;
  message?: string;
  price: number;
  subtotal: number;
}

export interface CustomOrder {
  type: string;
  tiers: number;
  shape: string;
  size: string;
  flavor: string;
  colorTheme: string;
  decorations: string[];
  message: string;
  photoUrl?: string;
  estimatedPrice: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}
