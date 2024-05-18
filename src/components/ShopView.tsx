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
        .map((product) => {
          if (product.status === "listed") {
            return <ProductCard key={product.name} product={product} />;
          }
        })}
    </>
  );
}
