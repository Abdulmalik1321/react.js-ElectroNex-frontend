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

export function ProductCard({
  product,
  customClass = "",
}: {
  product: Product;
  customClass: string;
}) {
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
      <Card
        className={`md:w-60 xxs:w-full h-full relative flex flex-col justify-between group ${customClass}`}>
        <CardContent className="flex flex-col items-center justify-center md:p-6 xxs:p-3">
          <Carousel setApi={setApi} className="w-3/4 flex items-center ">
            <CarouselContent
              className={`-ml-1 ${
                window.location.href.slice(-1) === "/" ? "" : ""
              }`}>
              {product.images.map((image) => {
                console.log(window.location.href);

                return (
                  <img
                    key={`${product.id}-img-${image[0]}`}
                    className="xxs:h-36 md:h-48 object-scale-down xxs:mb-2 md:mb-0"
                    src={image[0]}
                    alt=""
                  />
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="xxs:ml-6 md:ml-3 transition-opacity !opacity-0 group-hover:!opacity-100" />
            <CarouselNext className="xxs:mr-6 md:mr-3 transition-opacity !opacity-0 group-hover:!opacity-100" />
          </Carousel>
          <div className="flex justify-center gap-1 mt-2 mb-2">
            {product.images.map((color, index) => {
              return (
                <span
                  key={`${product.id}-as12e-${color[1] + index}`}
                  style={{ backgroundColor: `#${color[1]}` }}
                  className={`h-3 w-3 border border-muted-foreground rounded-full block ${
                    current === index ? "opacity-100" : "opacity-20"
                  }`}></span>
              );
            })}
          </div>
          <div className="text-center w-full xxs:mt-3 xxs:mb-2 md:mb-0 md:mt-6">
            <p className="text font-semibold xxs:text-nowrap xxs:overflow-hidden xxs:text-ellipsis xxs:whitespace-nowrap xxs:w-full">
              {product.name}
            </p>
            <span className="text-xs text-muted-foreground xxs:text-nowrap xxs:overflow-hidden xxs:text-ellipsis xxs:w-full xxs:h-4">
              {displaySizes.join(" | ")}
            </span>
          </div>
        </CardContent>
        <CardFooter className="xxs:p-3 md:p-6 !pt-0">
          <div className=" flex justify-between items-center w-full">
            <p className="text-sm text-muted-foreground">
              {product.price.toFixed(2).toLocaleString()}
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
