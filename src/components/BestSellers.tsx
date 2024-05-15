import { ShopView } from "./ShopView";
import { SkeletonCard } from "./SkeletonCard";

import api from "../api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";

export function BestSellers() {
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
    queryKey: ["BestSellers"],
    queryFn: getProducts,
  });

  console.log(data);

  return (
    <section className="w-full flex justify-center items-center flex-col mb-28">
      <p className="text-5xl">
        <strong>
          Best Sellers
          <strong />
        </strong>
      </p>

      <div className="grid grid-cols-5 gap-5 mt-12">
        {!data ? (
          !error ? (
            [...Array(10)].map((i) => <SkeletonCard key={i} />)
          ) : (
            <p className="ml-1 text-red-500">{error.message}</p>
          )
        ) : (
          <ShopView products={data} numberOfProducts={10} />
        )}
      </div>
    </section>
  );
}
