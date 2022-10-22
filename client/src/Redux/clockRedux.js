import { createSlice } from "@reduxjs/toolkit";

const clockSlice = createSlice({
  name: "clock",
  initialState: {
    timeLeft:""
  },
  reducers: {

  },
});

export const { addProduct, removeProduct } = clockSlice.actions;
export default clockSlice.reducer;
