import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import customizationReducer from "./slices/customizationSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    customization: customizationReducer,
    user: userReducer,
  },
});
