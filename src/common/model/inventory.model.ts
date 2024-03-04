export interface IInventory {
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
  imageUrl: string;
}

export interface ISocketInventory {
  action: string;
  inventory: any;
}
