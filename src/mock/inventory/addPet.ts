export const accounts = {
  _id: "101",
  username: "",
  password: "",
  name: "",
  role: "",
};

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
