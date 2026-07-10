import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "./generated/prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem: (id: Product["id"]) => void;
}

export const useStore = create<Store>((set) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId: _categoryId, image: _image, ...data } = product;

    set((state) => {
      const existingItem = state.order.find((item) => item.id === product.id);

      if (!existingItem) {
        return {
          order: [
            ...state.order,
            { ...data, quantity: 1, subtotal: product.price },
          ],
        };
      }

      return {
        order: state.order.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price,
              }
            : item,
        ),
      };
    });
  },
  increaseQuantity: (id) =>
    set((state) => ({
      order: state.order.map((item) => {
        if (item.id !== id) return item;

        const quantity = item.quantity + 1;
        return { ...item, quantity, subtotal: quantity * item.price };
      }),
    })),
  decreaseQuantity: (id) =>
    set((state) => ({
      order: state.order.map((item) => {
        if (item.id !== id) return item;

        const quantity = item.quantity - 1;
        return { ...item, quantity, subtotal: quantity * item.price };
      }),
    })),
  removeItem: (id) =>
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    })),
}));
