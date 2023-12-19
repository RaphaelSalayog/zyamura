import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./reducers/itemSlice";

const store = configureStore({
  reducer: itemSlice,
});
export default store;
