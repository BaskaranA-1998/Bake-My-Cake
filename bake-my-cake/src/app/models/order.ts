
export type Order = {
  id?: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: {
    doorNo?: string;
    street?: string;
    city?: string;
    pinCode?: string;
  };
  dessert?: {
    id?: number;
    name?: string;
    image?: string;
    price?: number;
    unit?: string;
    boxSize?: string;
    rating?: number;
    category?: string;
    description?: string;
  }
  orderDate?: string;
  dessertName?: string;
  quantity?: number;
  totalPrice?: number;
}
  