export type Product = {
  id: string;
  stocks: Stocks[];
  images: string[][];
  name: string;
  price: number;
  description: string;
  category: string;
  colors: string[];
  sizes: string[];
  numberOfSales: number;
  status: string;
  createdAt: string;
};

export type Stocks = {
  color: string;
  isMain: boolean;
  price: number;
  quantity: number;
  size: string;
  stockId: string;
  url: string;
  userName: string;
  condition: string;
  productName: string;
  cartItemId: number;
};
export type LoginInfo = {
  email: string;
  password: string;
};

export type ActionType =
  | { type: "login"; payload: { email: string; password: string } }
  | { type: "logout" }
  | { type: "addToCart"; payload: Stocks }
  | { type: "removeFromCart"; payload: Stocks[] }
  | { type: "setTotalSaving"; payload: number }
  | { type: "totalIncome"; payload: number }
  | { type: "totalExpense"; payload: number }
  | { type: "delete_income"; payload: number }
  | { type: "delete_expense"; payload: number };

export type LoginProps = {
  handelLogin: React.Dispatch<ActionType>;
};

export type UserInfo = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
  role: number;
  token: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};
