import { Home } from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { createContext, useReducer } from "react";
import { budgetReducer, initialState } from "./reducer/budgetReducer";

export const budgetContext = createContext<any>(null);

export function Router() {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return (
    <budgetContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </budgetContext.Provider>
  );
}
