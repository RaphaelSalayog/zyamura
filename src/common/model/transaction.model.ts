import { IInventory } from "./inventory.model";

export interface ITransaction {
  _id: string;
  date: string;
  transactionData: TransactionData;
}

export interface TransactionData {
  _id: string;
  time: string;
  orderedItems: OrderedItems[];
  totalPrice: number;
  cash: number;
  change: number;
}

export interface OrderedItems {
  _id: string;
  itemDetails: IInventory;
  quantity: number;
  price: number;
  totalItemPrice: number;
}

export interface ITransactionModified {
  _id: string;
  date: string;
  totalPricePerDay: number;
  transactionData: TransactionData[];
}
