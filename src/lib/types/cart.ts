/**
 * Domain types — Cart & Checkout
 */

import type { Money, ProductImage } from './product';

export type CartLineItem = {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  image?: ProductImage;
  price: Money;
  quantity: number;
  slug: string;
};

export type Cart = {
  id: string | null;
  items: CartLineItem[];
  itemCount: number;
  subtotal: Money;
};

export type CheckoutShipping = {
  method: 'nova_poshta' | 'uklon' | 'pickup';
  city?: string;
  warehouseId?: string;
  warehouseName?: string;
  address?: string;
};

export type CheckoutPayment = 'cash' | 'card_online' | 'card_pickup';

export type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type CheckoutState = {
  customer: CheckoutCustomer;
  shipping: CheckoutShipping;
  payment: CheckoutPayment;
  comment?: string;
};

export type PlaceOrderPayload = CheckoutState & {
  cartId: string;
};

export type PlaceOrderResult = {
  orderId: string;
  success: boolean;
  error?: string;
};
