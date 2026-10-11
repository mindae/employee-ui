import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    count: 0,
  },

  reducers: {
    inc: (state) => {
      state.count++;
    },

    dec: (state) => {
      state.count--;
    },

    incByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { inc, dec, incByAmount } = counterSlice.actions;

export default counterSlice.reducer;
