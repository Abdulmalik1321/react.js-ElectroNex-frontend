import api from "@/api";
import { NavBar } from "@/components/NavBar";
import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent } from "@/shadcn/ui/card";
import { Product, Stocks } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/ui/sheet";

export function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  // Queries
  const { data, error } = useQuery<Product>({
    queryKey: ["ProductDetails"],
    queryFn: getProducts,
  });

  const [displayImg, setDisplayImg] = useState<string>();
  const [images, setImages] = useState<string[]>([]);
  const [lowestPriceProduct, setLowestPriceProduct] = useState<any>({
    userName: "",
    quantity: 0,
    price: 0,
  });
  useEffect(() => {
    let displayImgTemp: string | undefined;
    const imagesTemp: string[] = [];

    data?.stocks.forEach((stock) => {
      if (stock.color === params.color) {
        if (stock.isMain && stock.condition === "new") {
          displayImgTemp = stock.url;
        }
        if (!imagesTemp.includes(stock.url) && stock.condition === "new") {
          imagesTemp.push(stock.url);
        }
      }
    });

    if (displayImgTemp) {
      setDisplayImg(displayImgTemp);
    }
    if (imagesTemp.length > 0) {
      setImages(imagesTemp);
    }

    if (data) {
      const lowestPriceProductTemp = data?.stocks.reduce(
        (lowest, stock) => {
          if (
            stock.color === params.color &&
            stock.size === params.size &&
            stock.quantity !== 0 &&
            stock.condition == "new"
          ) {
            if (stock.isMain) {
              return stock;
            } else if (!lowest.isMain) {
              return lowest.price < stock.price ? lowest : stock;
            }
          }
          return lowest;
        },
        { price: Infinity, isMain: false }
      );
      console.log(lowestPriceProductTemp);

      setLowestPriceProduct(lowestPriceProductTemp);
    }
  }, [data, params.color, params.size]);

  const navigateSize = (size: string) => {
    navigate(`/products/${params.productId}/${params.color}/${size}`);
  };
  const navigateColor = (color: string) => {
    navigate(`/products/${params.productId}/${color}/${params.size}`);
  };

  const selectedStock = () => {
    console.log(lowestPriceProduct);
  };

  const addToCart = (stock: Stocks) => {
    console.log(stock);
  };

  return (
    <div className="md:w-[80%] flex flex-col justify-start items-center xxs:w-[95%]">
      <NavBar />

      <div className="grid grid-cols-7 h-full w-full items-center gap-12">
        <Card
          className={`h-[calc(75dvh)] [background-position-x:-50px] bg-contain bg-no-repeat bg-center relative col-span-4`}
          style={{ backgroundImage: `url(${displayImg})` }}>
          <CardContent className=" absolute h-[90%] top-[5%] right-1 overflow-y-scroll">
            <div className="flex flex-col gap-4">
              {images.sort().map((img) => {
                return (
                  <Button
                    onClick={() => {
                      setDisplayImg(img);
                    }}
                    key={img}
                    className="h-24 w-20 aspect-square object-contain bg-background bg-contain bg-no-repeat bg-center"
                    style={{
                      backgroundImage: `url(${img})`,
                    }}></Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col h-[calc(70dvh)] overflow-hidden gap-5 col-span-3  justify-between">
          <div>
            <div className=" flex justify-between items-center">
              {lowestPriceProduct.quantity > 0 ? (
                <Badge variant="outline" className="w-fit gap-1 rounded-md">
                  <Check />
                  In Stock
                </Badge>
              ) : (
                <Badge
                  variant="destructive"
                  className="w-fit gap-1 rounded-md bg-destructive">
                  <X />
                  Out of Stock
                </Badge>
              )}
              <span className="text-sm">Delivery in 1 - 3 Days</span>
            </div>
            <div className="flex flex-col gap-3 mt-12">
              <h1 className="text-5xl">{data?.name}</h1>
              <p className="w-96">{data?.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-2xl mb-3">Color:</p>
              <div className="flex gap-2">
                {data?.colors.map((color) => {
                  return (
                    <Button
                      onClick={() => {
                        navigateColor(color);
                        selectedStock;
                      }}
                      variant="outline"
                      className="w-18 h-12 group"
                      key={color}>
                      <span
                        style={{ backgroundColor: color }}
                        className={`size-8 rounded-full block cursor-pointer border border-muted-foreground ${
                          color === params.color ? "opacity-100" : "opacity-40"
                        } group-hover:opacity-100 transition-opacity`}></span>
                    </Button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-2xl mb-3">Storage:</p>
              <div className="flex gap-2">
                {data?.sizes.sort().map((size) => {
                  return (
                    <Button
                      onClick={() => {
                        navigateSize(size);
                      }}
                      variant="outline"
                      className="w-18 h-12 group"
                      key={size}>
                      <span
                        className={`${
                          size === params.size ? "opacity-100" : "opacity-40"
                        } group-hover:opacity-100 transition-opacity`}>
                        {size}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div>
              <p className="text-2xl mb-0">
                Price:{" "}
                {(lowestPriceProduct.price != Infinity
                  ? lowestPriceProduct.price
                  : 0
                )
                  .toFixed(2)
                  .toLocaleString()}
              </p>
              <p className="text-xl mt-0"></p>
              <p className="text-sm">By: {lowestPriceProduct.userName}</p>
            </div>
            <div className="flex gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Buy It Used</Button>
                </SheetTrigger>
                <SheetContent className="p-0 pt-10 pb-10">
                  <SheetHeader className="p-5 pt-2 pb-">
                    <SheetTitle>{data?.name}</SheetTitle>
                    <SheetDescription>{data?.description}</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    {data?.stocks.map((stock) => {
                      if (stock.condition === "used" && stock.isMain) {
                        return (
                          <div
                            key={stock.stockId}
                            className="flex items-center gap-5 hover:bg-background p-5 pt-2 pb-2">
                            <Card
                              className={`size-20 bg-cover bg-no-repeat bg-center relative col-span-4`}
                              style={{ backgroundImage: `url(${stock.url})` }}
                            />
                            <div>
                              <p>{stock.userName}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <Badge className="rounded-sm" variant="outline">
                                  {stock.price.toFixed(2).toLocaleString()}
                                </Badge>
                                <Badge className="rounded-sm" variant="outline">
                                  {stock.size}
                                </Badge>
                                <Badge
                                  className="rounded-full aspect-square"
                                  variant="outline"
                                  style={{
                                    backgroundColor: stock.color,
                                  }}></Badge>
                              </div>
                              <SheetClose asChild>
                                <Badge
                                  onClick={() => {
                                    addToCart(stock);
                                  }}
                                  variant="outline"
                                  className="rounded-sm border-primary mt-2 cursor-pointer hover:bg-muted">
                                  Add To Cart
                                </Badge>
                              </SheetClose>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <SheetFooter></SheetFooter>
                </SheetContent>
              </Sheet>

              <Button onClick={selectedStock}>Add To Cart</Button>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}
