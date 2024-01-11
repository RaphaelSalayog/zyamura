import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialState {
  orderedItems: {
    productId: string;
    quantity: number;
    price: number;
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

interface setStock {
  productId: string;
  stock: number;
}

interface deductOrderedQuantity {
  productId: string;
  quantity: number;
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
        console.log(payload);
        state.orderedItems.push({
          ...payload,
          totalItemPrice: totalItemPrice,
        });
      }
      state.totalPrice += totalItemPrice;
    },
    onChangeOrderedQuantity: (
      state,
      { payload }: PayloadAction<deductOrderedQuantity>
    ) => {
      const orderedItemsId = state.orderedItems.find(
        (item) => item.productId === payload.productId
      );
      const itemStockId = state.itemStock.find(
        (item) => item.productId === payload.productId
      );
      // Note: Do not re-arrange the order of this code because it will affect the result
      if (orderedItemsId && itemStockId) {
        // To update the stocks
        itemStockId.stock += orderedItemsId.quantity - payload.quantity;
      }
      if (orderedItemsId) {
        // To update the ordered quantity
        orderedItemsId.quantity = payload.quantity;
        // To update the totalPrice
        state.totalPrice -=
          orderedItemsId.totalItemPrice -
          payload.quantity * orderedItemsId.price;
        // To update the totalItemPrice
        orderedItemsId.totalItemPrice = payload.quantity * orderedItemsId.price;
      }
    },
    resetOrder: () => {},
    setStock: (state, { payload }: PayloadAction<setStock>) => {
      state.itemStock.push(payload);
    },
    deductStock: (state, { payload }: PayloadAction<deductStock>) => {
      const id = state.itemStock.find(
        (item) => item.productId === payload.productId
      );
      if (id) {
        id.stock -= payload.quantity;
      }
    },
  },
});

export const {
  addOrder,
  onChangeOrderedQuantity,
  resetOrder,
  setStock,
  deductStock,
} = pointOfSalesSlice.actions;
export default pointOfSalesSlice.reducer;
