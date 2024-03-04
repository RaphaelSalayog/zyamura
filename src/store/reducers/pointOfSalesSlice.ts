import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { inventoryInitialState } from "./inventorySlice";
import { IInventory } from "@/common/model/inventory.model";

export interface orderedItems {
  _id: string;
  itemDetails: IInventory;
  quantity: number;
  price: number;
  totalItemPrice: number;
}

export interface itemStock {
  _id: string;
  stock: number;
}

interface initialState {
  orderedItems: orderedItems[];
  itemStock: itemStock[];
  totalPrice: number;
}

interface addPetAndItem {
  _id: string;
  itemDetails: IInventory;
  quantity: number;
  price: number;
}

interface setStock {
  _id: string;
  stock: number;
}

interface deductOrderedQuantity {
  _id: string;
  quantity: number;
}

interface deductStock {
  _id: string;
  quantity: number;
}

interface revmoveOrderItem {
  _id: string;
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
      const id = state.orderedItems.find((item) => item._id == payload._id);

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
        (item) => item._id === payload._id
      );
      const itemStockId = state.itemStock.find(
        (item) => item._id === payload._id
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
            (item) => item._id === payload._id
          );
          if (indexToRemove !== -1) {
            state.orderedItems.splice(indexToRemove, 1);
          }
        }
      }
    },
    setStock: (state, { payload }: PayloadAction<setStock>) => {
      const itemStock = state.itemStock.find(
        (item) => item._id === payload._id
      );
      const orderedItemsId = state.orderedItems.find(
        (item) => item._id === payload._id
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
      const id = state.itemStock.find((item) => item._id === payload._id);
      if (id) {
        id.stock -= payload.quantity;
      }
    },
    removeOrderItem: (state, { payload }: PayloadAction<revmoveOrderItem>) => {
      const indexToRemove = state.orderedItems.findIndex(
        (item) => item._id === payload._id
      );
      if (indexToRemove !== -1) {
        // Deduct total price
        state.totalPrice -= state.orderedItems[indexToRemove].totalItemPrice;
        // Remove updated ordered item
        state.orderedItems.splice(indexToRemove, 1);
      }
    },
    clearAllOrder: (state) => {
      state.orderedItems.map((item) => {
        state.itemStock.map((value) => {
          if (item._id === value._id) {
            value.stock += item.quantity;
          }
        });
      });
      state.orderedItems = [];
      state.totalPrice = 0;
    },
    removeOrder: (state) => {
      state.orderedItems = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addOrder,
  onChangeOrderedQuantity,
  setStock,
  deductStock,
  removeOrderItem,
  clearAllOrder,
  removeOrder,
} = pointOfSalesSlice.actions;
export default pointOfSalesSlice.reducer;
