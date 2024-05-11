// import { Button } from "@/shadcn/ui/button";
// import { Card, CardContent, CardFooter } from "@/shadcn/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types";

export function TopPicks({ products }: { products: Product[] }) {
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
          {Array.from(products).map((product, index) => (
            <CarouselItem
              key={index}
              className="pl-1  md:basis-1/2 lg:basis-1/4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
