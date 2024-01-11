import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialState {
  orderedItems: {
    productId: string;
    quantity: number;
    totalItemPrice: number;
  }[];
  itemStock: {
    productId: string;
    stock: number;
  }[];
  totalPrice: number;
}

interface addPetAndItem {
  productId: string;
  quantity: number;
  price: number;
}

interface addStock {
  productId: string;
  stock: number;
}

interface deductStock {
  productId: string;
  quantity: number;
}

const initialState: initialState = {
  orderedItems: [],
  itemStock: [],
  totalPrice: 0,
};

const pointOfSalesSlice = createSlice({
  name: "point-of-sales",
  initialState,
  reducers: {
    addOrder: (state, { payload }: PayloadAction<addPetAndItem>) => {
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
    setStock: (state, { payload }: PayloadAction<addStock>) => {
      state.itemStock.push(payload);
    },
    deductStock: (state, { payload }: PayloadAction<deductStock>) => {
      const id = state.itemStock.find(
        (item) => item.productId == payload.productId
      );
      if (id) {
        id.stock -= payload.quantity;
      }
    },
  },
});

export const { addOrder, resetOrder, setStock, deductStock } =
  pointOfSalesSlice.actions;
export default pointOfSalesSlice.reducer;
