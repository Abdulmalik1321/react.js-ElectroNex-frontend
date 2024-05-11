// import { useQuery } from "@tanstack/react-query";

import { Button } from "./shadcn/ui/button";

// import api from "./api";

import "./App.css";
import { ThemeProvider } from "./shadcn/theme-provider";
import { ModeToggle } from "./shadcn/mode-toggle";
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";

function App() {
  // const getProducts = async () => {
  //   try {
  //     const res = await api.get("/products");
  //     return res.data;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.reject(new Error("Something went wrong"));
  //   }
  // };

  // Queries
  // const { data, error } = useQuery<Product[]>({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  // });

  return (
    <div className="md:w-[80%] flex flex-col justify-start items-start xxs:w-[95%] h-[10000px]">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavBar />
        <Hero />
      </ThemeProvider>
    </div>
  );
}

export default App;
