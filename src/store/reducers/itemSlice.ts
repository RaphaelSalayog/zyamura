import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
});

export const {} = itemSlice.actions;

export default itemSlice.reducer;
