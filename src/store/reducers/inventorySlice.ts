import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface inventoryInitialState {
  inventoryId: string;
  inventoryObject: string;
  name: string;
  inventorySupplier: string;
  inventoryDescription: string;
  inventorySellingPrice: number;
  inventoryInvestmentCost: number;
  inventoryCategory: string | null;
  inventoryGender: string | null;
  inventoryType: string | null;
  inventoryQuantity: number;
  inventoryImage: any[];
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
    inventoryObject: "Pet",
    name: payload.petName,
    inventorySupplier: payload.petSupplier,
    inventoryDescription: payload.petDescription,
    inventorySellingPrice: payload.petSellingPrice,
    inventoryInvestmentCost: payload.petInvestmentCost,
    inventoryCategory: payload.petCategory,
    inventoryGender: payload.petGender,
    inventoryType: payload.petType,
    inventoryQuantity: payload.petQuantity,
    inventoryImage: payload.petImage,
  };
};

const itemData = (payload: any) => {
  return {
    inventoryId: payload.itemId,
    inventoryObject: "Item",
    name: payload.itemName,
    inventorySupplier: payload.itemSupplier,
    inventoryDescription: payload.itemDescription,
    inventorySellingPrice: payload.itemSellingPrice,
    inventoryInvestmentCost: payload.itemInvestmentCost,
    inventoryCategory: null,
    inventoryGender: null,
    inventoryType: null,
    inventoryQuantity: payload.itemQuantity,
    inventoryImage: payload.itemImage,
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
            value.inventoryQuantity -= item.quantity;
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
