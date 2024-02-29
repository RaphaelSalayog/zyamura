export const accounts = {
  _id: "101",
  username: "",
  password: "",
  name: "",
  role: "",
};

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

export interface Transaction {
  date: string;
  transactionData: {
    transactionId: string;
    time: string;
    orderedItems: {
      productId: string;
      itemDetails: inventoryInitialState;
      quantity: number;
      price: number;
      totalItemPrice: number;
    }[];
    totalPrice: number;
    cash: number;
    change: number;
  }[];
  totalPricePerDay: number;
}
