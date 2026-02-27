'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, SavedAddress, OrderHistoryItem } from '@/lib/types/auth';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone: string }) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, _password) => {
        set({
          user: {
            id: `user-${Date.now()}`,
            email,
            firstName: 'Користувач',
            lastName: '',
            phone: '',
            createdAt: new Date().toISOString(),
          },
          isAuthenticated: true,
        });
        return true;
      },
      register: (data) => {
        set({
          user: {
            id: `user-${Date.now()}`,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            createdAt: new Date().toISOString(),
          },
          isAuthenticated: true,
        });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'bellizoo-auth' }
  )
);

type ProfileState = {
  updateProfile: (data: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>) => void;
};

export const useProfileStore = create<ProfileState>()((set, get) => ({
  updateProfile: (data) => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    useAuthStore.setState({ user: { ...user, ...data } });
  },
}));

type AddressesState = {
  addresses: SavedAddress[];
  addAddress: (address: Omit<SavedAddress, 'id'>) => void;
  updateAddress: (id: string, address: Partial<SavedAddress>) => void;
  removeAddress: (id: string) => void;
  setDefault: (id: string) => void;
};

const MOCK_ADDRESSES: SavedAddress[] = [];

export const useAddressesStore = create<AddressesState>()(
  persist(
    (set) => ({
      addresses: MOCK_ADDRESSES,
      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            {
              ...address,
              id: `addr-${Date.now()}`,
            },
          ],
        })),
      updateAddress: (id, data) =>
        set((state) => ({
          addresses: state.addresses.map((a) => (a.id === id ? { ...a, ...data } : a)),
        })),
      removeAddress: (id) =>
        set((state) => ({ addresses: state.addresses.filter((a) => a.id !== id) })),
      setDefault: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
        })),
    }),
    { name: 'bellizoo-addresses' }
  )
);

type OrdersState = {
  orders: OrderHistoryItem[];
  addOrder: (order: OrderHistoryItem) => void;
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    }),
    { name: 'bellizoo-orders' }
  )
);
