import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardFooter } from "@/shadcn/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/ui/sheet";
import { AddToCart } from "./AddToCart";
import { Product } from "@/types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { useEffect, useState } from "react";
// import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  // const [activeColor, setActiveColor] = useState(product.colors[0]);

  const [carouselApi, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
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
              {product.colors.map((color) => {
                return (
                  <img
                    key={`img-${color}`}
                    className="h-48 object-cover"
                    src={product.image}
                    alt=""
                  />
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="ml-3 transition-opacity !opacity-0 group-hover:!opacity-100" />
            <CarouselNext className="mr-3 transition-opacity !opacity-0 group-hover:!opacity-100" />
          </Carousel>
          <div className="flex justify-center gap-1 mt-2 mb-2">
            {/* <div className="py-2 text-center text-sm text-muted-foreground">
              Slide {current} of {count}
            </div> */}
            {product.colors.map((color, index) => {
              return (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className={`h-3 w-3 border border-muted-foreground rounded-full block ${
                    current === index + 1 ? "opacity-100" : "opacity-20"
                  }`}></span>
              );
            })}
          </div>
          {/* <img className="h-48 object-cover" src={product.image} alt="" /> */}
          <div className="text-center w-full mt-6">
            <p className="text font-semibold">{product.name}</p>
            <span className="text-xs text-muted-foreground">
              {displaySizes.join(" | ")}
            </span>
            {/* <div className="flex justify-center gap-1 mt-2 mb-2">
              {product.colors.map((color) => {
                return (
                  <span
                    key={color}
                    style={{ backgroundColor: color }}
                    className={`h-3 w-3 border border-secondary-foreground rounded-full block`}></span>
                );
              })}
            </div> */}
          </div>
        </CardContent>
        <CardFooter className="">
          <div className=" flex justify-between items-center w-full">
            <p className="text-sm text-muted-foreground">{product.price} SAR</p>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="border border-[hsl(var(--primary))] font-bold text-xs p-2 h-8"
                  variant="ghost">
                  Buy Now
                </Button>
              </SheetTrigger>
              <SheetContent>
                <AddToCart product={product} />
              </SheetContent>
            </Sheet>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
