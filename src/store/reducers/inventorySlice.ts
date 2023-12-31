import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface inventoryInitialState {
  inventory: {
    inventoryId: number;
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
  itemName: string;
  itemSupplier: string;
  itemDescription: string;
  itemSellingPrice: number;
  itemInvestmentCost: number;
  itemQuantity: number;
  itemImage: any[];
}

const initialState: inventoryInitialState = {
  inventory: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addPet: (state, { payload }: PayloadAction<addPet>) => {
      state.inventory.push({
        inventoryId: state.inventory.length,
        inventoryObject: "PET",
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
      });
    },
    addItem: (state, { payload }: PayloadAction<addItem>) => {
      state.inventory.push({
        inventoryId: state.inventory.length,
        inventoryObject: "ITEM",
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
      });
    },
  },
});

export const { addPet, addItem } = inventorySlice.actions;

export default inventorySlice.reducer;
