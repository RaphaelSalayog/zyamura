import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialState {
  orderedItems: {
    productId: string;
    quantity: number;
    totalItemPrice: number;
  }[];
  totalPrice: number;
}

interface addPet {
  productId: string;
  quantity: number;
  price: number;
}

const initialState: initialState = {
  orderedItems: [],
  totalPrice: 0,
};

const pointOfSalesSlice = createSlice({
  name: "point-of-sales",
  initialState,
  reducers: {
    addOrder: (state, { payload }: PayloadAction<addPet>) => {
      const id = state.orderedItems.find(
        (item) => item.productId == payload.productId
      );

      const totalItemPrice = payload.quantity * payload.price;
      if (id) {
        id.quantity += payload.quantity;
        id.totalItemPrice += totalItemPrice;
      } else {
        state.orderedItems.push({
          ...payload,
          totalItemPrice: totalItemPrice,
        });
      }
      state.totalPrice += totalItemPrice;
    },
    resetOrder: () => {},
  },
});

export const { addOrder, resetOrder } = pointOfSalesSlice.actions;
export default pointOfSalesSlice.reducer;
