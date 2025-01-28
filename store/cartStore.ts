import type { Product } from "@/utils/api";
import { create } from "zustand";

export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
  total: number;
  totalItems: number;
}

const INITIAL_STATE: CartState = {
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  clearCart: () => {},
  total: 0,
  totalItems: 0,
};

export const useCartStore = create<CartState>()((set) => ({
  ...INITIAL_STATE,
  addProduct: (product) => {
    set((state) => {
      const existingProduct = state.products.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }

      const total = state.products.reduce(
        (acc, p) => acc + p.price * p.quantity,
        0,
      );
      const totalItems = state.products.reduce((acc, p) => acc + p.quantity, 0);

      return {
        ...state,
        total,
        totalItems,
      };
    });
  },
  clearCart: () => {
    set(INITIAL_STATE);
  },
}));
