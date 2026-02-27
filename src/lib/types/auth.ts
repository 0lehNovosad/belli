export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
};

export type SavedAddress = {
  id: string;
  label: string;
  city: string;
  warehouseId?: string;
  warehouseName?: string;
  fullAddress?: string;
  isDefault: boolean;
};

export type OrderHistoryItem = {
  id: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  itemCount: number;
};
