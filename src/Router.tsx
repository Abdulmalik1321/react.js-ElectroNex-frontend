import "./App.css";
import { createContext, useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Login } from "./pages/Login";

import { ThemeProvider } from "./shadcn/theme-provider";
import { shopReducer, initialState } from "./reducer/shopReducer";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";

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
    {
      path: "/login",
      element: <Login handelLogin={dispatch} />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
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
