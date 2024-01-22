import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./reducers/inventorySlice";
import pointOfSalesSlice from "./reducers/pointOfSalesSlice";
import transactionSlice from "./reducers/transactionSlice";

const store = configureStore({
  reducer: {
    inventory: inventorySlice,
    pointOfSales: pointOfSalesSlice,
    transaction: transactionSlice,
  },
});
export default store;
