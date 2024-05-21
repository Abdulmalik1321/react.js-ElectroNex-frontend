import { shopContext } from "@/Router";
import { NavBar } from "@/components/NavBar";
import { Badge } from "@/shadcn/ui/badge";

import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";

import { Separator } from "@/shadcn/ui/separator";
import { Stocks } from "@/types";
import { LocalStorage } from "@/utils";
import { Item } from "@radix-ui/react-dropdown-menu";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useContext } from "react";
export function Cart() {
  const { state, dispatch } = useContext(shopContext);

  const calculateQuantity = (stockId: string) => {
    let quantity = 0;
    state.cart.forEach((item: Stocks) => {
      if (item.stockId === stockId) {
        quantity++;
      }
    });
    return quantity;
  };

  const removeFromCart = (cartItemId: string) => {
    const newCart = state.cart.filter((item: Stocks) => {
      return item.stockId !== cartItemId;
    });

    LocalStorage("cart", newCart);
    dispatch({
      type: "removeFromCart",
      payload: newCart,
    });
  };

  const increaseQty = (cartItem: Stocks) => {
    console.log(cartItem);

    LocalStorage("cart", [...state.cart, cartItem]);

    dispatch({
      type: "addToCart",
      payload: cartItem,
    });
  };

  const decreaseQty = (cartItem: Stocks) => {
    const allCartItems = state.cart;
    const index = allCartItems.findIndex(
      (item) => item.stockId === cartItem.stockId
    );
    console.log(index);

    allCartItems.splice(index, 1);

    console.log(allCartItems);

    LocalStorage("cart", allCartItems);
    dispatch({
      type: "removeFromCart",
      payload: allCartItems,
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <NavBar />
      <div className="h-[92vh] pt-10 pb-10 grid grid-cols-12 grid-rows-12 gap-5 w-[80%]">
        <Card className="col-span-8 row-span-12 rounded-2xl ">
          <CardHeader>
            <CardTitle className="text-5xl">Cart Items</CardTitle>
            <Separator />
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-7 mb-8 text-muted-foreground">
              <span className="col-span-3 flex flex-col">Product Details</span>
              <span className="col-span-2">Quantity</span>
              <span>Price</span>
              <span>Remove</span>
            </div>

            {state.cart
              ?.filter(
                (cartItem: Stocks, index: number, self: Stocks[]) =>
                  index ===
                  self.findIndex((item) => item.stockId === cartItem.stockId)
              )
              .map((cartItem: Stocks, index: number) => {
                return (
                  <div
                    key={`${cartItem.stockId}-${index}`}
                    className="grid grid-cols-7">
                    <div className="col-span-3 flex ">
                      <Card
                        className="size-32 bg-contain bg-no-repeat bg-center"
                        style={{
                          backgroundImage: `url(${cartItem.url})`,
                        }}
                      />
                      <div className="flex flex-col justify-center ml-5">
                        <p>{cartItem.productName}</p>
                        <div className="flex items-center">
                          <Badge
                            className="rounded-sm m-0 mt-1 mr-2 text-sm font-normal"
                            variant="outline">
                            {cartItem.size}
                          </Badge>
                          <span
                            style={{ backgroundColor: cartItem.color }}
                            className={`size-4 border border-muted-foreground rounded-full inline-block`}></span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center gap-3 text-xl">
                      <Button
                        onClick={() => {
                          decreaseQty(cartItem);
                        }}
                        variant="outline"
                        className="p-0 h-fit">
                        <ChevronLeft />
                      </Button>
                      <span>{calculateQuantity(cartItem.stockId)}</span>
                      <Button
                        variant="outline"
                        className="p-0 h-fit"
                        onClick={() => {
                          increaseQty(cartItem);
                        }}>
                        <ChevronRight />
                      </Button>
                    </div>

                    <div className="flex items-center">
                      <Badge className="rounded-sm mt-1 mr-2" variant="outline">
                        {cartItem.price} SAR
                      </Badge>
                    </div>

                    <Button
                      onClick={() => {
                        removeFromCart(cartItem.stockId);
                      }}
                      variant="default">
                      <X />
                    </Button>
                  </div>
                );
              })}
          </CardContent>
        </Card>

        <Card className="col-span-4 row-span-4 rounded-2xl p-0 flex flex-col justify-around">
          <CardHeader>
            <CardTitle className="text-3xl">Coupon Code</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            <Input placeholder="Enter Your Coupon" />
          </CardContent>
          <CardFooter className=" justify-center flex items-end ">
            <Button className="w-full border border-primary" variant="outline">
              Apply Your Coupon
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-4 row-span-4 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl">Order Summary</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="pb-0 h-[55%]  flex flex-col justify-between">
            <div className="w-full flex justify-between">
              <span>Discount</span>
              <span>0.00</span>
            </div>
            <div className="w-full flex justify-between">
              <span>Delivery</span>
              <span>10.00</span>
            </div>
            <div className="w-full flex justify-between">
              <span>Vat</span>
              <span>1000.00</span>
            </div>
            <Separator />
            <div className="w-full flex justify-between">
              <span>Total</span>
              <span>1000.00</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4 row-span-4 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl">Payment Method</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="flex gap-5">
            <Button className="size-20 bg-muted bg-[url(https://framerusercontent.com/images/GfcI9NmQBdKh98dSnEvPCmg5nCo.png)] bg-center bg-contain bg-no-repeat" />
            <Button className="size-20 bg-muted bg-[url(https://static.vecteezy.com/system/resources/previews/020/975/576/original/visa-logo-visa-icon-transparent-free-png.png)] bg-center bg-cover" />
            <Button className="size-20 bg-muted bg-[url(https://iconape.com/wp-content/files/ei/387896/png/387896.png)] bg-center bg-cover" />
            <Button className="size-20 bg-muted bg-[url(https://cdn.salla.sa/mRjq/JgbK3sdmqb4jbdS1NLt6otYYH7ArDipt5Hetqypo.png)] bg-center bg-contain bg-no-repeat" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full">Checkout</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
