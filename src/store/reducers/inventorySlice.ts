import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface inventoryInitialState {
  inventory: {
    inventoryId: string;
    inventoryObject: string;
    inventoryName: string;
    inventorySupplier: string;
    inventoryDescription: string;
    inventorySellingPrice: number;
    inventoryInvestmentCost: number;
    inventoryCategory: string | null;
    inventoryGender: string | null;
    inventoryType: string | null;
    inventoryQuantity: number;
    inventoryImage: any[];
  }[];
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

const initialState: inventoryInitialState = {
  inventory: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addPet: (state, { payload }: PayloadAction<addPet>) => {
      const data = {
        inventoryId: payload.petId,
        inventoryObject: "Pet",
        inventoryName: payload.petName,
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

      // Check if the item is existing
      const index = state.inventory.findIndex(
        (item) => item.inventoryId === payload.petId
      );
      if (index !== -1) {
        // If it is existing
        state.inventory[index] = data; // Update the specified properties for the object
      } else {
        //If it is not
        state.inventory.push(data); // Add the object to the inventory array
      }
    },
    addItem: (state, { payload }: PayloadAction<addItem>) => {
      const data = {
        inventoryId: payload.itemId,
        inventoryObject: "Item",
        inventoryName: payload.itemName,
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

      // Check if the item is existing
      const index = state.inventory.findIndex(
        (item) => item.inventoryId === payload.itemId
      );
      if (index !== -1) {
        // If it is existing
        state.inventory[index] = data; // Update the specified properties for the object
      } else {
        //If it is not
        state.inventory.push(data); // Add the object to the inventory array
      }
    },
    removeInventoryItem: (state, { payload }: PayloadAction<removeItem>) => {
      console.log(payload.inventoryId);
      const indexToRemove = state.inventory.findIndex(
        (item) => item.inventoryId === payload.inventoryId
      );

      // Remove the object if found
      if (indexToRemove !== -1) {
        state.inventory.splice(indexToRemove, 1);
      }
    },
  },
});

export const { addPet, addItem, removeInventoryItem } = inventorySlice.actions;

export default inventorySlice.reducer;
