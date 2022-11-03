import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total +=
        action.payload.status === "ONGOING"
          ? action.payload.price * action.payload.quantity
          : action.payload.bidPrice * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.products.splice(action.payload.index, 1);
      state.quantity -= 1;
      state.total -=
      action.payload.product.status === "ONGOING"
        ? action.payload.product.price * action.payload.product.quantity
        : action.payload.product.bidPrice * action.payload.product.quantity;
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
