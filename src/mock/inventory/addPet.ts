export const accounts = {
  _id: "101",
  username: "",
  password: "",
  name: "",
  role: "",
};

export interface inventoryInitialState {
  _id: string;
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
    _id: string;
    time: string;
    orderedItems: {
      _id: string;
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
