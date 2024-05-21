import userTokensJson from "../assets/JSON/appSettings.json";

import { Product } from "@/types";
import { LocalStorage } from "@/utils";

type Reducer = {
  userInfo: any;
  cart: Product[];
  products: Product[];
  userTokens: { admin: string; customer: string };
};

export const initialState: Reducer = {
  userInfo: LocalStorage("userInfo"),
  cart: LocalStorage("cart") ? LocalStorage("cart") : LocalStorage("cart", []),
  products: [],
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
    case "updateUser":
      return {
        ...state,
        userInfo: action.payload,
      };

    case "addToCart":
      if (!state.cart) {
        return {
          ...state,
          cart: [action.payload],
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case "removeFromCart":
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return;
  }
}
