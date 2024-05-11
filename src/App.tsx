// import { useQuery } from "@tanstack/react-query";
// import api from "./api";
import productsJson from "./assets/JSON/products.json";

import "./App.css";
import { ThemeProvider } from "./shadcn/theme-provider";
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { TopPicks } from "./components/TopPicks";
import { Product } from "./types";

function App() {
  const products: Product[] = JSON.parse(JSON.stringify(productsJson)).products;
  return (
    <div className="md:w-[80%] flex flex-col justify-start items-start xxs:w-[95%] h-[10000px]">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavBar />
        <Hero />
        <TopPicks products={products} />
      </ThemeProvider>
    </div>
  );
}

export default App;
