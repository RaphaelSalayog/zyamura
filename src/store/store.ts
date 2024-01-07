import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./reducers/inventorySlice";
import pointOfSalesSlice from "./reducers/pointOfSalesSlice";

const store = configureStore({
  reducer: { inventory: inventorySlice, pointOfSales: pointOfSalesSlice },
});
export default store;
