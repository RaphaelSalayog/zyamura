import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./reducers/inventorySlice";

const store = configureStore({
  reducer: { inventory: inventorySlice },
});
export default store;
