import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardFooter } from "@/shadcn/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/ui/sheet";
import { AddToCart } from "./AddToCart";
import { Product } from "@/types";
import { SkeletonCard } from "./SkeletonCard";

export function ProductCard({ product }: { product: Product }) {
  const sizes = product.sizes.sort((a, b) => {
    const sizeA = parseInt(a.replace("TB", "000"));
    const sizeB = parseInt(b.replace("TB", "000"));
    return sizeA - sizeB;
  });
  const displaySizes = sizes.length > 3 ? [...sizes.slice(0, 3), "..."] : sizes;
  return (
    <>
      <Card className="w-60 h-full relative flex flex-col justify-between">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <img className="h-48 object-cover" src={product.image} alt="" />
          <div className="text-center w-full mt-6">
            <p className="text font-semibold">{product.name}</p>
            <span className="text-xs text-muted-foreground">
              {displaySizes.join(" | ")}
            </span>
            <div className="flex justify-center gap-1 mt-2 mb-2">
              {product.colors.map((color) => {
                return (
                  <span
                    key={color}
                    style={{ backgroundColor: color }}
                    className={`h-3 w-3 border border-secondary-foreground rounded-full block`}></span>
                );
              })}
            </div>
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
                  Add To Cart
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
