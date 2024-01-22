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

interface revmoveOrderItem {
  productId: string;
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
        // To check if the quantity of ordered item is 0. If it is true, it will be remove in the orderedItems array
        if (payload.quantity === 0) {
          const indexToRemove = state.orderedItems.findIndex(
            (item) => item.productId === payload.productId
          );
          if (indexToRemove !== -1) {
            state.orderedItems.splice(indexToRemove, 1);
          }
        }
      }
    },
    resetOrder: () => {},
    setStock: (state, { payload }: PayloadAction<setStock>) => {
      const itemStock = state.itemStock.find(
        (item) => item.productId === payload.productId
      );
      const orderedItemsId = state.orderedItems.find(
        (item) => item.productId === payload.productId
      );
      if (itemStock) {
        if (!orderedItemsId) {
          itemStock.stock = payload.stock;
        } else {
          // To update the stocks when there are ordered items and you changed a path and goes back to POS
          itemStock.stock = payload.stock - orderedItemsId.quantity;
        }
      } else {
        state.itemStock.push(payload);
      }
    },
    deductStock: (state, { payload }: PayloadAction<deductStock>) => {
      const id = state.itemStock.find(
        (item) => item.productId === payload.productId
      );
      if (id) {
        id.stock -= payload.quantity;
      }
    },
    removeOrderItem: (state, { payload }: PayloadAction<revmoveOrderItem>) => {
      const indexToRemove = state.orderedItems.findIndex(
        (item) => item.productId === payload.productId
      );
      if (indexToRemove !== -1) {
        // Deduct total price
        state.totalPrice -= state.orderedItems[indexToRemove].totalItemPrice;
        // Remove updated ordered item
        state.orderedItems.splice(indexToRemove, 1);
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
  removeOrderItem,
} = pointOfSalesSlice.actions;
export default pointOfSalesSlice.reducer;
