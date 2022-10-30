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
          console.log(state.products);
    },
    removeProduct: (state, action) => {
      state.products.filter((product, i) => i !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
