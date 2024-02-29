import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface inventoryInitialState {
  inventoryId: string;
  object: string;
  name: string;
  supplier: string;
  description: string;
  sellingPrice: number;
  investmentCost: number;
  category: string | null;
  gender: string | null;
  type: string | null;
  quantity: number;
  imageUrl: any[];
}

export interface initialState {
  inventory: inventoryInitialState[];
}

interface addPet {
  petId: string;
  petName: string;
  petSupplier: string;
  petDescription: string;
  petSellingPrice: number;
  petInvestmentCost: number;
  petCategory: string;
  petGender: string;
  petType: string;
  petQuantity: number;
  petImage: any[];
}

interface addItem {
  itemId: string;
  itemName: string;
  itemSupplier: string;
  itemDescription: string;
  itemSellingPrice: number;
  itemInvestmentCost: number;
  itemQuantity: number;
  itemImage: any[];
}

interface removeItem {
  inventoryId: string;
}

interface deductOrderedItems {
  productId: string;
  quantity: number;
  price: number;
  totalItemPrice: number;
}

const petData = (payload: any) => {
  return {
    inventoryId: payload.petId,
    object: "Pet",
    name: payload.petName,
    supplier: payload.petSupplier,
    description: payload.petDescription,
    sellingPrice: payload.petSellingPrice,
    investmentCost: payload.petInvestmentCost,
    category: payload.petCategory,
    gender: payload.petGender,
    type: payload.petType,
    quantity: payload.petQuantity,
    imageUrl: payload.petImage,
  };
};

const itemData = (payload: any) => {
  return {
    inventoryId: payload.itemId,
    object: "Item",
    name: payload.itemName,
    supplier: payload.itemSupplier,
    description: payload.itemDescription,
    sellingPrice: payload.itemSellingPrice,
    investmentCost: payload.itemInvestmentCost,
    category: null,
    gender: null,
    type: null,
    quantity: payload.itemQuantity,
    imageUrl: payload.itemImage,
  };
};

const initialState: initialState = {
  inventory: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addPet: (state, { payload }: PayloadAction<addPet>) => {
      state.inventory.push(petData(payload)); // Add the object to the inventory array
    },
    addItem: (state, { payload }: PayloadAction<addItem>) => {
      state.inventory.push(itemData(payload)); // Add the object to the inventory array
    },
    updatePet: (state, { payload }) => {
      const index = state.inventory.findIndex(
        (item) => item.inventoryId === payload.petId
      );
      state.inventory[index] = petData(payload); // Update the specified properties for the object
    },
    updateItem: (state, { payload }) => {
      // Check if the item is existing
      const index = state.inventory.findIndex(
        (item) => item.inventoryId === payload.itemId
      );
      state.inventory[index] = itemData(payload); // Update the specified properties for the object
    },
    removeInventoryItem: (state, { payload }: PayloadAction<removeItem>) => {
      const indexToRemove = state.inventory.findIndex(
        (item) => item.inventoryId === payload.inventoryId
      );

      // Remove the object if found
      if (indexToRemove !== -1) {
        state.inventory.splice(indexToRemove, 1);
      }
    },
    deductOrderedItems: (
      state,
      { payload }: PayloadAction<deductOrderedItems[]>
    ) => {
      payload.map((item) =>
        state.inventory.map((value) => {
          if (item.productId === value.inventoryId) {
            value.quantity -= item.quantity;
          }
        })
      );
    },
  },
});

export const {
  addPet,
  addItem,
  updatePet,
  updateItem,
  removeInventoryItem,
  deductOrderedItems,
} = inventorySlice.actions;

export default inventorySlice.reducer;
