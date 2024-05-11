import { useContext } from "react";

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ShopView } from "@/components/ShopView";

import { shopContext } from "../Router";
import { Separator } from "@/shadcn/ui/separator";

export function Shop() {
  const { state } = useContext(shopContext);
  return (
    <main className="md:w-[80%] flex flex-col justify-center items-center xxs:w-[95%]">
      <NavBar />
      <div className="flex justify-start items-center gap-5 w-full mt-12 ml-24">
        <p className="text-3xl">
          <strong>Products</strong>
        </p>
        <Separator
          className="bg-[hsl(var(--foreground))]"
          orientation="vertical"
        />
        <p>Filter 1</p>
        <p>Filter 2</p>
        <p>Filter 3</p>
      </div>
      <div className="grid grid-cols-5 gap-5 mt-6">
        <ShopView products={state.products} numberOfProducts={20} />
      </div>
      <Footer />
    </main>
  );
}
