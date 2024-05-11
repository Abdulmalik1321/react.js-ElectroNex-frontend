// import { checkLocalStorage } from "../util/util";
// import { StateType, ActionType, IncExpData } from "../compon/ents/types";
// import { stat } from "fs";
// import { IncomeExp } from "../components/IncomeExp";

let localSavingString: string | null = localStorage.getItem("saving");

if (!localSavingString) {
  localStorage.setItem("saving", "0");
  localSavingString = localStorage.getItem("saving");
}

export const initialState: any = {
  // incomes: checkLocalStorage("income"),
  // expenses: checkLocalStorage("expense"),
  totalSaving: Number(localSavingString),
};

export function budgetReducer(state: any, action: any) {
  switch (action.type) {
    case "add_income": // add_income
      return {};
  }
}
