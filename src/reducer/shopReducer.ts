import productsJson from "../assets/JSON/products.json";
import userTokensJson from "../assets/JSON/appSettings.json";

import { Product } from "@/types";
import { LocalStorage } from "@/utils";

type Reducer = {
  userInfo: any;
  products: Product[];
  userTokens: { admin: string; customer: string };
};

export const initialState: Reducer = {
  userInfo: LocalStorage("userInfo"),
  products: JSON.parse(JSON.stringify(productsJson)).products,
  userTokens: JSON.parse(JSON.stringify(userTokensJson)).tokens,
};

export function shopReducer(state: any, action: any) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "logout":
      return {
        ...state,
        userInfo: null,
      };
    default:
      return;
  }
}
