import { ShopView } from "./ShopView";
import { SkeletonCard } from "./SkeletonCard";

import api from "../api";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { easeInOut, motion } from "framer-motion";

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
          Best Seller Products
          <strong />
        </strong>
      </p>

      {!data ? (
        !error ? (
          <div className="grid grid-cols-4 gap-5 mt-12">
            {[...Array(8)].map((num, index) => (
              <SkeletonCard key={`BestSellers-${num}-${index}`} />
            ))}
          </div>
        ) : (
          <p className="ml-1 text-red-500">{error.message}</p>
        )
      ) : (
        <motion.div
          className="grid grid-cols-4 gap-5 mt-12"
          initial={{ opacity: 0, scale: 1, translateY: 20 }}
          whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: easeInOut,
          }}>
          <ShopView products={data} numberOfProducts={8} />
        </motion.div>
      )}
    </section>
  );
}
