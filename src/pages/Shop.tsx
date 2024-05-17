import { useContext } from "react";

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ShopView } from "@/components/ShopView";

import { shopContext } from "../Router";
import { Separator } from "@/shadcn/ui/separator";
import api from "@/api";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "@/components/SkeletonCard";

export function Shop() {
  const { state } = useContext(shopContext);

  const getProducts = async () => {
    try {
      const res = await api.get("/products?sort=1");
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["ShopPage"],
    queryFn: getProducts,
  });

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
        {!data ? (
          !error ? (
            [...Array(20)].map((num, index) => (
              <SkeletonCard key={`BestSellers-${num}-${index}`} />
            ))
          ) : (
            <p className="ml-1 text-red-500">{error.message}</p>
          )
        ) : (
          <ShopView products={data} numberOfProducts={20} />
        )}
      </div>
      <Footer />
    </main>
  );
}
