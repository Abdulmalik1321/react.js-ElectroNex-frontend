import { Product } from "../types";
import productsJson from "../assets/JSON/products.json";

type Reducer = {
  products: Product[];
};

export const initialState: Reducer = {
  products: JSON.parse(JSON.stringify(productsJson)).products,
};

export function shopReducer(state: any, action: any) {
  switch (action.type) {
    case "add_income": // add_income
      return { state };
    default:
      return state;
  }
}
