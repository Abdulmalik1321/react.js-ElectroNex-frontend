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
  | { type: "removeFromCart"; payload: Stocks[] };

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

export type SignUpInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;
};

export type SignUpProps = {
  handelSignUp: React.Dispatch<ActionType>;
};
