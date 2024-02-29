import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./reducers/inventorySlice";
import pointOfSalesSlice from "./reducers/pointOfSalesSlice";
import transactionSlice from "./reducers/transactionSlice";
import accountSlice from "./reducers/accountSlice";

const store = configureStore({
  reducer: {
    inventory: inventorySlice,
    pointOfSales: pointOfSalesSlice,
    transaction: transactionSlice,
    account: accountSlice,
  },
});
export default store;
