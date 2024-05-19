import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types";
import { SkeletonCard } from "./SkeletonCard";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { easeInOut, motion } from "framer-motion";

export function TopPicks() {
  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["TopPicks"],
    queryFn: getProducts,
  });
  return (
    <section className="mt-28 mb-48 w-full flex justify-between items-center">
      <div className="w-1/4">
        <motion.div
          className=""
          initial={{ opacity: 0, scale: 1, translateX: -20 }}
          whileInView={{ opacity: 1, scale: 1, translateX: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: easeInOut,
          }}>
          <p className="text-5xl">
            <strong>
              Top Picks
              <br />
              of the week
            </strong>
          </p>
          <p>
            Our experts-curated selection brings
            <br />
            you the hottest tech products this week
          </p>
        </motion.div>
      </div>

      <Carousel className="w-3/4 flex items-center">
        <CarouselContent className="-ml-1">
          {!data ? (
            !error ? (
              [...Array(10)].map((i, index) => (
                <SkeletonCard
                  customClass="ml-1 mr-[14px]"
                  key={`12-${i}-${index}`}
                />
              ))
            ) : (
              <p className="ml-1 text-red-500">{error.message}</p>
            )
          ) : (
            Array.from(data).map((product, index) => {
              if (product.status === "listed") {
                return (
                  <motion.div
                    key={index}
                    className=""
                    initial={{ opacity: 0, scale: 1, translateX: 20 }}
                    whileInView={{ opacity: 1, scale: 1, translateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: easeInOut,
                    }}>
                    <div className="pl-1 mr-[14px] md:basis-1/2 lg:basis-1/4">
                      <ProductCard product={product} />
                    </div>
                  </motion.div>
                );
              }
            })
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
