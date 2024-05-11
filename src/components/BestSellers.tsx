import { Product } from "@/types";
import { ShopView } from "./ShopView";

export function BestSellers({ products }: { products: Product[] }) {
  return (
    <section className="w-full flex justify-center items-center flex-col mb-28">
      <p className="text-5xl">
        <strong>
          Best Sellers
          <strong />
        </strong>
      </p>

      <div className="grid grid-cols-5 gap-5 mt-12">
        <ShopView products={products} numberOfProducts={10} />
      </div>
    </section>
  );
}
