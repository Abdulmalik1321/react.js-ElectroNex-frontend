import "./App.css";
import { createContext, useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ThemeProvider } from "./shadcn/theme-provider";
import { shopReducer, initialState } from "./reducer/shopReducer";

export const shopContext = createContext<any>(null);

export function Router() {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/shop",
      element: <Shop />,
    },
  ]);
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <shopContext.Provider value={{ state, dispatch }}>
        <RouterProvider router={router} />
      </shopContext.Provider>
    </ThemeProvider>
  );
}
