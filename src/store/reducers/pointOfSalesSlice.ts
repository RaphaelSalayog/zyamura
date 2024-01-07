import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialState {
  orderedItems: {
    productId: string;
    quantity: number;
  }[];
}

interface addPet {
  productId: string;
  quantity: number;
}

const initialState: initialState = {
  orderedItems: [],
};

const pointOfSalesSlice = createSlice({
  name: "point-of-sales",
  initialState,
  reducers: {
    addOrder: (state, { payload }: PayloadAction<addPet>) => {
      console.log("payload >> " + payload);
      // state.orderedItems.push()
    },
    resetOrder: () => {},
  },
});

export const { addOrder, resetOrder } = pointOfSalesSlice.actions;
export default pointOfSalesSlice.reducer;
