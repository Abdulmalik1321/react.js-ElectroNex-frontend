import api from "@/api";
import { NavBar } from "@/components/NavBar";
import { CreateEdit } from "@/components/DashboardListings";
import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent } from "@/shadcn/ui/card";
import { Product, Stocks } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Banknote, Check, ListPlus, Loader2, Plus, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import {
  Link,
  ScrollRestoration,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { shopContext } from "../Router";
import { Review } from "@/components/Reviews";
import { LocalStorage } from "@/utils";
import { useToast } from "@/shadcn/ui/use-toast";
import { Footer } from "@/components/Footer";

export function ProductDetails() {
  const [scrollPosition, setscrollPosition] = useState<number>(0);
  window.scroll(0, scrollPosition);
  const params = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(shopContext);
  const { toast } = useToast();

  const getProducts = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const getWishlists = async () => {
    try {
      const res = await api.get(`/wishlist/user/${state.userInfo.id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const addToWishlists = async (WishlistId: string, productId: string) => {
    try {
      const res = await api.put(`/wishlist/${WishlistId}/${productId}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const queryMultiple = () => {
    const res1 = useQuery<Product>({
      queryKey: ["ProductDetails"],
      queryFn: getProducts,
    });
    const res2 = useQuery<any>({
      queryKey: ["WishList"],
      queryFn: getWishlists,
    });
    return [res1, res2];
  };

  const [
    { data: data, error: error },
    { data: wishlistData, error: wishlistError },
  ] = queryMultiple();

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

    data?.stocks.forEach((stock: any) => {
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
        (lowest: any, stock: any) => {
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

      setLowestPriceProduct(lowestPriceProductTemp);
    }
  }, [data, params.color, params.size]);

  const navigateSize = (size: string) => {
    setscrollPosition(window.pageYOffset);
    navigate(`/products/${params.productId}/${params.color}/${size}`);
  };
  const navigateColor = (color: string) => {
    setscrollPosition(window.pageYOffset);
    navigate(`/products/${params.productId}/${color}/${params.size}`);
  };

  const addToCart = (cartItem: Stocks) => {
    cartItem.productName = data.name;
    // cartItem["cartItemId"] = d;
    if (state.cart === null) {
      LocalStorage("cart", [cartItem]);
    } else {
      LocalStorage("cart", [...state.cart, cartItem]);
    }
    dispatch({
      type: "addToCart",
      payload: cartItem,
    });

    toast({
      duration: 3000,
      variant: "default",
      title: (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" /> Adding To Cart
        </span>
      ),
    });

    setTimeout(() => {
      toast({
        duration: 3000,
        variant: "default",
        className: "bg-green-600",
        title: (
          <span className="flex items-center gap-2">
            <Check /> {cartItem.productName} Added To Cart
          </span>
        ),
      });
    }, 1000);
  };

  return (
    <main className="md:w-[80%] flex flex-col justify-start items-center xxs:w-[95%] min-h-screen">
      <div>
        <NavBar />
      </div>

      <div className="grid xxs:grid-cols-1 md:grid-cols-7 h-full w-full items-center gap-12 mt-16 ">
        <Card
          className={`xxs:h-[calc(50vh)] md:h-[calc(75vh)] [background-position-x:0px] bg-[length:80%] bg-no-repeat bg-center relative md:col-span-4`}
          style={{ backgroundImage: `url(${displayImg})` }}>
          <CardContent className="xxs:p-2 md:p-6 :md:pt-0 absolute h-[90%] top-[5%] right-1 overflow-y-scroll no-scrollbar">
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

        <div className="flex flex-col md:h-[calc(70vh)] overflow-hidden gap-5 md:col-span-3  justify-between ">
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
              <h1 className="xxs:text-2xl md:text-5xl">{data?.name}</h1>
              <p className="md:w-96">{data?.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 ml-[3px]">
            <div>
              <p className="text-2xl mb-3">Color:</p>
              <div className="flex flex-wrap gap-2">
                {data?.colors.map((color: any) => {
                  return (
                    <Button
                      onClick={() => {
                        navigateColor(color);
                      }}
                      variant="outline"
                      className="w-18 h-12 group"
                      key={color}>
                      <span
                        style={{ backgroundColor: `#${color}` }}
                        className={`size-8 rounded-full block cursor-pointer border border-muted-foreground ${
                          color === params.color ? "opacity-100" : "opacity-40"
                        } group-hover:opacity-100 transition-opacity`}></span>
                    </Button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-2xl mb-3">Size:</p>
              <div className="flex gap-2">
                {data?.sizes.sort().map((size: any) => {
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
            <div className="flex items-center gap-2 pt-12">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Banknote />
                    Sell This Product
                  </Button>
                </SheetTrigger>
                <CreateEdit productIdProp={data?.id} editStock={null} />
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="overflow-hidden rounded-md flex items-center gap-1">
                    <ListPlus />
                    Add To Wishlist
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {wishlistData?.map((wishlist: any) => {
                    return (
                      <DropdownMenuItem
                        onClick={async () => {
                          toast({
                            duration: 10000,
                            variant: "default",
                            title: (
                              <span className="flex items-center gap-2">
                                <Loader2 className="animate-spin" /> Adding{" "}
                                {data?.name} To your Wishlist
                              </span>
                            ),
                          });
                          await addToWishlists(wishlist.id, data.id)
                            .then(() => {
                              toast({
                                duration: 3000,
                                variant: "default",
                                className: "bg-green-600",
                                title: (
                                  <span className="flex items-center gap-2">
                                    <Check /> Added To your Wishlist
                                  </span>
                                ),
                              });
                            })
                            .catch(() => {
                              toast({
                                duration: 3000,
                                variant: "destructive",
                                title: `Something went wrong`,
                                description: `or ${data?.name} is already in your wishlist`,
                              });
                            });
                        }}
                        key={wishlist.id}>
                        <span>{wishlist.name}</span>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuItem>
                    <Link to={"/profile"} className="flex gap-1 items-center">
                      <Plus className="size-4" />
                      Create a Wishlist
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="w-full flex xxs:flex-col md:flex-row gap-5 md:justify-between md:items-center xxs:mt-8 md:mt-0">
            <div>
              {lowestPriceProduct.price != Infinity ? (
                <div>
                  <p className="text-2xl mb-0">
                    Price:{" "}
                    {lowestPriceProduct.price.toFixed(2).toLocaleString()} SAR
                  </p>
                  <p className="text-sm">By: {lowestPriceProduct.userName}</p>
                </div>
              ) : (
                <p className="text-2xl mb-0">-----</p>
              )}
            </div>
            <div className="flex gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">See all options</Button>
                </SheetTrigger>
                <SheetContent className="p-0 pt-10 pb-10">
                  <SheetHeader className="p-5 pt-2 pb-">
                    <SheetTitle>{data?.name}</SheetTitle>
                    <SheetDescription>{data?.description}</SheetDescription>
                  </SheetHeader>
                  <Tabs defaultValue="all">
                    <div className="flex items-center justify-center gap-5">
                      <TabsList className="w-[50%]">
                        <TabsTrigger className="w-full" value="all">
                          New
                        </TabsTrigger>
                        <TabsTrigger className="w-full" value="used">
                          Used
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="all">
                      <div className="grid gap-4 py-4 xxs:h-[70dvh] md:h-[80dvh] overflow-y-scroll">
                        <div>
                          {data?.stocks.map((stock: any) => {
                            if (stock.condition !== "used" && stock.isMain) {
                              return (
                                <Accordion
                                  key={stock.stockId}
                                  type="single"
                                  collapsible
                                  className="w-full text-left gap-2 p-5 pt-2 pb-2">
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                      <div className="text-left">
                                        <p>By: {stock.userName}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                          <Badge
                                            className="rounded-sm"
                                            variant="outline">
                                            {stock.price
                                              .toFixed(2)
                                              .toLocaleString()}
                                          </Badge>
                                          <Badge
                                            className="rounded-sm"
                                            variant="outline">
                                            {stock.size}
                                          </Badge>
                                          <Badge
                                            className="rounded-full aspect-square"
                                            variant="outline"
                                            style={{
                                              backgroundColor: `#${stock.color}`,
                                            }}></Badge>
                                        </div>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="grid grid-cols-5 gap-2 items-start h-48">
                                      <img
                                        className={`md:h-full aspect-square object-contain rounded-md bg-no-repeat bg-center relative col-span-2`}
                                        src={stock.url}
                                      />
                                      <div className="col-span-3">
                                        <p>
                                          Lorem ipsum dolor sit amet consectetur
                                          adipisicing elit. Cupiditate illum
                                          magni vero molestias. Quis earum
                                          provident velit pariatur eum iure
                                          dolorum aut accusantium unde, nesciunt
                                          ab, quas eaque
                                        </p>
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
                                        <Badge
                                          variant="outline"
                                          className="rounded-sm border-primary mt-2 cursor-pointer hover:bg-muted ml-2">
                                          More Details
                                        </Badge>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="used">
                      <div className="grid gap-4 py-4 xxs:h-[70dvh] md:h-[80dvh] overflow-y-scroll">
                        <div>
                          {data?.stocks.map((stock: any) => {
                            if (stock.condition === "used" && stock.isMain) {
                              return (
                                <Accordion
                                  key={stock.stockId}
                                  type="single"
                                  collapsible
                                  className="w-full text-left gap-2 p-5 pt-2 pb-2">
                                  <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                      <div className="text-left">
                                        <p>By: {stock.userName}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                          <Badge
                                            className="rounded-sm"
                                            variant="outline">
                                            {stock.price
                                              .toFixed(2)
                                              .toLocaleString()}
                                          </Badge>
                                          <Badge
                                            className="rounded-sm"
                                            variant="outline">
                                            {stock.size}
                                          </Badge>
                                          <Badge
                                            className="rounded-full aspect-square"
                                            variant="outline"
                                            style={{
                                              backgroundColor: `#${stock.color}`,
                                            }}></Badge>
                                        </div>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="grid grid-cols-5 gap-2 items-start h-48">
                                      <img
                                        className={`md:h-full aspect-square object-contain rounded-md bg-no-repeat bg-center relative col-span-2`}
                                        src={stock.url}
                                      />
                                      <div className="col-span-3">
                                        <p>
                                          Lorem ipsum dolor sit amet consectetur
                                          adipisicing elit. Cupiditate illum
                                          magni vero molestias. Quis earum
                                          provident velit pariatur eum iure
                                          dolorum aut accusantium unde, nesciunt
                                          ab, quas eaque
                                        </p>
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
                                        <Badge
                                          variant="outline"
                                          className="rounded-sm border-primary mt-2 cursor-pointer hover:bg-muted ml-2">
                                          More Details
                                        </Badge>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <SheetFooter></SheetFooter>
                </SheetContent>
              </Sheet>

              <Button
                onClick={() => {
                  addToCart(lowestPriceProduct);
                }}>
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
      <Review />
      <Footer />
      <ScrollRestoration />
    </main>
  );
}
