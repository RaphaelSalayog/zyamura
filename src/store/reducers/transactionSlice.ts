import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface addTransaction {
  transactionId: string;
  transactionDate: string;
  orderedItems: {
    productId: string;
    quantity: number;
    price: number;
    totalItemPrice: number;
  }[];
  totalPrice: number;
  cash: number;
  change: number;
}

export interface initialState {
  transaction: addTransaction[];
}
const initialState: initialState = {
  transaction: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, { payload }: PayloadAction<addTransaction>) => {
      state.transaction.push(payload);
    },
  },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
