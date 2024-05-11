import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

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
        {Array.from(products)
          .slice(0, 10)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
}
