import { createSlice } from "@reduxjs/toolkit";
import { calculatePrice } from "../../utils/pricing";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
        const pricing = calculatePrice(
          existingItem.basePrice,
          existingItem.quantity
        );
        existingItem.unitPrice = pricing.unitPrice;
        existingItem.totalPrice = pricing.totalPrice;
        existingItem.discountPercent = pricing.discountPercent;
      } else {
        const qty = action.payload.quantity || 1;
        const pricing = calculatePrice(action.payload.price, qty);
        state.items.push({
          ...action.payload,
          quantity: qty,
          basePrice: action.payload.price,
          unitPrice: pricing.unitPrice,
          totalPrice: pricing.totalPrice,
          discountPercent: pricing.discountPercent,
        });
      }

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
        const pricing = calculatePrice(item.basePrice, quantity);
        item.unitPrice = pricing.unitPrice;
        item.totalPrice = pricing.totalPrice;
        item.discountPercent = pricing.discountPercent;
      }

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
