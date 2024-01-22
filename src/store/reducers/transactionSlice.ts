import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface addTransaction {
  transactionId: string;
  transactionDate: string;
  orderedItems: {
    productId: string;
    quantity: number;
    price: number;
    totalItemPrice: number;
  }[];
  totalPrice: number;
}

interface initialState {
  transaction: {
    transactionId: string;
    transactionDate: string;
    orderedItems: {
      productId: string;
      quantity: number;
      price: number;
      totalItemPrice: number;
    }[];
    totalPrice: number;
  }[];
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
