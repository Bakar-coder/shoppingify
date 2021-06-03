import { Dispatch } from "react";

export interface shop {
  currencies: string[];
  products: any;
  product: any;
  shippingAddress: any;
  paymentMethod: any;
  cartTotal: number;
  totalDiscount: number;
  setCartTotal: any;
  setDiscount: any;
  dispatch?: Dispatch<any>;
}
