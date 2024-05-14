export type Product = {
  id: string;
  img: string;
  name: string;
  price: number;
  description: string;
  category: string;
  color: string;
  size: string;
};

export type LoginInfo = {
  email: string;
  password: string;
};

export type ActionType =
  | { type: "login"; payload: { email: string; password: string } }
  | { type: "logout" }
  | { type: "edit_income"; payload: FormData }
  | { type: "edit_expense"; payload: FormData }
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
