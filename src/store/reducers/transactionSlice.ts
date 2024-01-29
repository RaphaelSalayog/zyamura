import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { inventoryInitialState } from "./inventorySlice";

export interface OrderedItems {
  productId: string;
  itemDetails: inventoryInitialState;
  quantity: number;
  price: number;
  totalItemPrice: number;
}

export interface TransactionData {
  transactionId: string;
  time: string;
  orderedItems: OrderedItems[];
  totalPrice: number;
  cash: number;
  change: number;
}

export interface AddTransaction {
  date: string;
  transactionData: TransactionData;
}

export interface Transaction {
  date: string;
  transactionData: TransactionData[];
  totalPricePerDay: number;
}

export interface initialState {
  transaction: Transaction[];
}
const initialState: initialState = {
  transaction: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, { payload }: PayloadAction<AddTransaction>) => {
      const existingData = state.transaction.find(
        (item) => item.date === payload.date
      );

      if (existingData) {
        existingData.transactionData.push(payload.transactionData);
        existingData.totalPricePerDay += payload.transactionData.totalPrice;
      } else {
        state.transaction.push({
          date: payload.date,
          transactionData: [payload.transactionData],
          totalPricePerDay: payload.transactionData.totalPrice,
        });
      }
    },
  },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
