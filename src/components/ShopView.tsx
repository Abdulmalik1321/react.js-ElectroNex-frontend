import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function ShopView({
  products,
  numberOfProducts,
}: {
  products: Product[];
  numberOfProducts: number;
}) {
  return (
    <>
      {Array.from(products)
        .slice(0, numberOfProducts)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </>
  );
}
