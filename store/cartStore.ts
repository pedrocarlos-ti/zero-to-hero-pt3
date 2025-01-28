import type { Product } from "@/utils/api";
import { create } from "zustand";
import { zustandStorage } from "@/store/mmkv";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  totalItems: number;
}

const INITIAL_STATE: CartState = {
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0,
  totalItems: 0,
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      addProduct: (product) => {
        set((state) => {
          const existingProduct = state.products.find(
            (p) => p.id === product.id,
          );
          if (existingProduct) {
            existingProduct.quantity++;
          } else {
            state.products.push({ ...product, quantity: 1 });
          }

          const total = state.products.reduce(
            (acc, p) => acc + p.price * p.quantity,
            0,
          );
          const totalItems = state.products.reduce(
            (acc, p) => acc + p.quantity,
            0,
          );

          return {
            ...state,
            total,
            totalItems,
          };
        });
      },
      removeProduct: (productId) => {
        set((state) => {
          const products = state.products.filter((p) => p.id !== productId);
          const total = products.reduce(
            (acc, p) => acc + p.price * p.quantity,
            0,
          );
          const totalItems = products.reduce((acc, p) => acc + p.quantity, 0);

          return {
            ...state,
            products,
            total,
            totalItems,
          };
        });
      },
      updateQuantity: (productId, quantity) => {
        set((state) => {
          const products = state.products.map((p) =>
            p.id === productId ? { ...p, quantity } : p,
          );
          const total = products.reduce(
            (acc, p) => acc + p.price * p.quantity,
            0,
          );
          const totalItems = products.reduce((acc, p) => acc + p.quantity, 0);

          return {
            ...state,
            products,
            total,
            totalItems,
          };
        });
      },
      clearCart: () => {
        set({ products: [], total: 0, totalItems: 0 });
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
