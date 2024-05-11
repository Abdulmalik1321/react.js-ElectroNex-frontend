import { Button } from "@/shadcn/ui/button";
import { Sheet } from "@/shadcn/ui/sheet";
import { Product } from "@/types";

export function AddToCart({ product }: { product: Product }) {
  return (
    <Sheet>
      <img src={product.img} alt="" />
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
      <p className="mt-5">{product.description}</p>
      <Button className="mt-5">Add To Cart</Button>
    </Sheet>
  );
}
