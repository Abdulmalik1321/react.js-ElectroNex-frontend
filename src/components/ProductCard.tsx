import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardFooter } from "@/shadcn/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/ui/sheet";
import { AddToCart } from "./AddToCart";
import { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <>
      <Card className="w-60 h-full relative">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <img className="h-48 object-contain" src={product.img} alt="" />
          <div className="text-center w-full mt-6">
            <p className="text font-semibold">{product.name}</p>
            <span className="text-xs text-muted-foreground">
              64GB | 128GB | 256GB | 512GB
            </span>
            <div className="flex justify-center gap-1 mt-2 mb-2">
              <span className="bg-red-600 h-3 w-3 border border-secondary-foreground rounded-full block"></span>
              <span className="bg-gray-600 h-3 w-3 border border-secondary-foreground rounded-full block"></span>
              <span className="bg-yellow-600 h-3 w-3 border border-secondary-foreground rounded-full block"></span>
              <span className="bg-white h-3 w-3 border border-secondary-foreground rounded-full block"></span>
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
                  variant="outline">
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
