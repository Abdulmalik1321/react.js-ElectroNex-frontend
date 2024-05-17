import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardFooter } from "@/shadcn/ui/card";
import { Product } from "@/types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  // const [activeColor, setActiveColor] = useState(product.colors[0]);

  const [carouselApi, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    setCurrent(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const sizes = product.sizes.sort((a, b) => {
    const sizeA = parseInt(a.replace("TB", "000"));
    const sizeB = parseInt(b.replace("TB", "000"));
    return sizeA - sizeB;
  });
  const displaySizes = sizes.length > 3 ? [...sizes.slice(0, 3), "..."] : sizes;
  return (
    <>
      <Card className="w-60 h-full relative flex flex-col justify-between group">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Carousel setApi={setApi} className="w-3/4 flex items-center">
            <CarouselContent className="-ml-1">
              {product.images.map((image) => {
                return (
                  <img
                    key={`img-${image[0]}`}
                    className="h-48 object-cover"
                    src={image[0]}
                    alt=""
                  />
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="ml-3 transition-opacity !opacity-0 group-hover:!opacity-100" />
            <CarouselNext className="mr-3 transition-opacity !opacity-0 group-hover:!opacity-100" />
          </Carousel>
          <div className="flex justify-center gap-1 mt-2 mb-2">
            {product.images.map((color, index) => {
              return (
                <span
                  key={color[1]}
                  style={{ backgroundColor: color[1] }}
                  className={`h-3 w-3 border border-muted-foreground rounded-full block ${
                    current === index ? "opacity-100" : "opacity-20"
                  }`}></span>
              );
            })}
          </div>
          <div className="text-center w-full mt-6">
            <p className="text font-semibold">{product.name}</p>
            <span className="text-xs text-muted-foreground">
              {displaySizes.join(" | ")}
            </span>
          </div>
        </CardContent>
        <CardFooter className="">
          <div className=" flex justify-between items-center w-full">
            <p className="text-sm text-muted-foreground">
              {product.price.toFixed(2).toLocaleString()} SAR
            </p>
            <Link
              to={`/products/${product.id}/${product.images[current][1]}/${displaySizes[0]}`}>
              <Button
                className="border border-[hsl(var(--primary))] font-bold text-xs p-2 h-8"
                variant="ghost">
                Buy Now
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
