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
    <section className="mt-28 mb-28 w-full flex justify-between items-center">
      <div className="w-1/4">
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
      </div>

      <Carousel className="w-3/4 flex items-center">
        <CarouselContent className="-ml-1">
          {!data ? (
            !error ? (
              [...Array(10)].map((i) => (
                <SkeletonCard customClass="ml-1 mr-[14px]" key={i} />
              ))
            ) : (
              <p className="ml-1 text-red-500">{error.message}</p>
            )
          ) : (
            Array.from(data).map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
