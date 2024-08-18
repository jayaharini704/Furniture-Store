import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    addProductToCart: (state, action) => {
      const existingProduct = state.cartItems.find((item) => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.cartItems.push({ ...action.payload });
      }
    },
    removeProductFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.cartItems.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  }
});

export const { addProductToCart, removeProductFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
