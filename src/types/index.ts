export type ScreenName =
  | 'home'
  | 'menu'
  | 'souvenirs'
  | 'branches'
  | 'deals'
  | 'loyalty'
  | 'about'
  | 'auth'
  | 'order-tracking';

export interface MenuItem {
  id: string;
  name: string;
  category: 'matcha' | 'coffee' | 'tea' | 'yogurt' | 'glass' | 'pastry';
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  highlightTag?: string;
  dineInOnly?: boolean;
  optionsLabel?: string;
  options?: string[];
  stockCount?: number;
}

export interface CartItem {
  id: string;
  menuItemId?: string;
  name: string;
  price: number;
  quantity: number;
  selectedOption?: string;
  sugarLevel?: string; // e.g. '100% Đường', '70% Đường', '50% Đường', '30% Đường', '0% Không đường'
  iceLevel?: string;   // e.g. '100% Đá', '70% Đá', '50% Đá', '30% Đá', 'Không đá', 'Uống nóng'
  specialNotes?: string;
  image?: string;
}

export interface Branch {
  id: string;
  number: number;
  name: string;
  district: 'thanh-khe' | 'hai-chau' | 'son-tra' | 'ngu-hanh-son';
  districtName: string;
  address: string;
  hours: string;
  phone: string;
  subtitle: string;
  badge: string;
  badgeRotate?: string;
  image: string;
  statusBadge: string;
  features: string[];
  icon: string;
}

export interface WorkshopClass {
  id: string;
  title: string;
  category: string;
  price: number;
  duration: string;
  description: string;
  perks: string[];
  image: string;
  badge: string;
}

export interface SouvenirProduct {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  badge: string;
  perk: string;
}

export interface ComboItem {
  id: string;
  title: string;
  name: string;
  savings: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  items: string[];
  badge?: string;
  category: string;
}

export interface Voucher {
  code: string;
  title: string;
  discountDesc: string;
  category: string;
  badge: string;
  icon: string;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  status: string;
  step: number;
  items: CartItem[];
  subTotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  orderMethod: 'pickup' | 'delivery';
  pickupTime?: string;
  branchName: string;
  deliveryAddress: string;
  receiverName: string;
  receiverPhone: string;
  customerNotes?: string;
  shipperName: string;
  shipperPhone: string;
  shipperPlate: string;
  estimatedDeliveryTime: string;
}
