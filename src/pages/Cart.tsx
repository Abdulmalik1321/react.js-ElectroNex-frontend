import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { shopContext } from "@/Router";
import api from "@/api";

import { PaymentMethod } from "@/components/PaymentMethod";
import { NavBar } from "@/components/NavBar";

import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { Separator } from "@/shadcn/ui/separator";
import { useToast } from "@/shadcn/ui/use-toast";

import { Stocks } from "@/types";
import { LocalStorage } from "@/utils";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

export function Cart() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(shopContext);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
    LocalStorage("cart", [...state.cart, cartItem]);

    dispatch({
      type: "addToCart",
      payload: cartItem,
    });
  };

  const decreaseQty = (cartItem: Stocks) => {
    const allCartItems = state.cart;
    const index = allCartItems.findIndex(
      (item: any) => item.stockId === cartItem.stockId
    );
    allCartItems.splice(index, 1);

    LocalStorage("cart", allCartItems);
    dispatch({
      type: "removeFromCart",
      payload: allCartItems,
    });
  };

  let cartTotal = 0;

  state.cart.forEach((item: any) => {
    console.log(item);

    cartTotal += item.price;
  });

  cartTotal = cartTotal * 1.15;
  cartTotal != 0 ? (cartTotal += 10) : 0;

  const handlePayment = () => {
    setLoading(true);
    const paymentDetails = {
      amount: cartTotal,
      method: "mada",
      userId: state.userInfo.id,
      items: state.cart
        .filter(
          (cartItem: Stocks, index: number, self: Stocks[]) =>
            index ===
            self.findIndex((item) => item.stockId === cartItem.stockId)
        )
        .map((item: Stocks) => {
          return {
            quantity: calculateQuantity(item.stockId),
            stockId: item.stockId,
          };
        }),
    };
    createPayment(paymentDetails);
  };

  const createPayment = async (paymentDetails: any) => {
    try {
      const res = await api.post(`/payment`, paymentDetails, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });

      LocalStorage("cart", []);

      dispatch({
        type: "removeFromCart",
        payload: [],
      });

      navigate(`/thank-you/${res.data.id}`);
      return res.data;
    } catch (error) {
      toast({
        duration: 10000,
        variant: "destructive",
        title: (
          <span className="flex items-center gap-2">
            Something Went Wrong or a Product is out of stock
          </span>
        ),
      });
      setLoading(false);
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <NavBar />

      <div className="md:h-[92vh] pt-10 pb-10 grid xxs:grid-cols-1 xxs:grid-rows-1 md:grid-cols-12 grid-rows-12 gap-5 xxs:w-[90%] md:w-[80%]">
        <Card className="xxs:col-span-1 md:col-span-8 md:row-span-12 md:rounded-2xl ">
          <CardHeader className="xxs:px-2 md:px-6">
            <CardTitle className="md:text-5xl">Cart Items</CardTitle>
            <Separator />
          </CardHeader>

          <CardContent className="xxs:px-2 md:px-6">
            <div className="xxs:hidden md:grid grid-cols-7 mb-8 text-muted-foreground">
              <span className="col-span-3 flex flex-col">Product Details</span>
              <span>Size/Color</span>
              <span>Quantity</span>
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
                    className="grid xxs:grid-cols-9 md:grid-cols-7 mt-3">
                    <div className="xxs:col-span-3 md:col-span-3 flex xxs:flex-col md:flex-row  ">
                      <Card
                        className="xxs:size-12 xxs:rounded-sm rounded-lg md:size-24 bg-contain bg-no-repeat bg-center bg-background"
                        style={{
                          backgroundImage: `url(${cartItem.url})`,
                        }}
                      />
                      <div className="flex flex-col justify-center xxs:mt-1 md:mt-0 md:ml-5">
                        <strong>
                          <p className="md:text-xl">{cartItem.productName}</p>
                        </strong>
                        <p className="text-muted-foreground xxs:text-xs md:text-sm">
                          By: {cartItem.userName}
                        </p>
                      </div>
                    </div>
                    <div className="flex xxs:col-span-2 md:col-span-1 xxs:flex-col-reverse md:flex-row items-center xxs:place-self-center md:place-self-auto">
                      <Badge
                        className="rounded-sm m-0 mt-1 mr-2 text-sm font-normal"
                        variant="outline">
                        {cartItem.size}
                      </Badge>
                      <span
                        style={{ backgroundColor: `#${cartItem.color}` }}
                        className={`size-4 border border-muted-foreground rounded-full inline-block`}></span>
                    </div>

                    <div className="xxs:col-span-3 md:col-span-2 grid flex-col-reverse md:grid-cols-2 place-items-center">
                      <div className="flex items-center justify-center w-full gap-3 text-xl xxs:order-last md:order-first xxs:place-self-start md:place-self-auto">
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

                      <div className="flex items-center w-full justify-center xxs:place-self-end md:place-self-auto">
                        <span>{cartItem.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex items-center xxs:place-self-center md:place-self-auto">
                      <Button
                        className="xxs:p-2 xxs:h-fit md:h-10 md:p-4 xxs:mt-6 md:mt-0"
                        onClick={() => {
                          removeFromCart(cartItem.stockId);
                        }}
                        variant="destructive">
                        <Trash2 className="xxs:size-4 md:size-6" />
                      </Button>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>

        <Card className="xxs:col-span-1 md:col-span-4 md:row-span-4 rounded-2xl">
          <CardHeader className="pb-0">
            <CardTitle className="md:text-3xl">Order Summary</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="pb-0 h-[55%]  flex flex-col justify-between">
            <div className="w-full flex justify-between">
              <span>Discount</span>
              <span>0.00</span>
            </div>
            <div className="w-full flex justify-between">
              <span>Delivery</span>
              <span>{cartTotal == 0 ? "0.00" : "10.00"}</span>
            </div>
            <div className="w-full flex justify-between">
              <span>VAT</span>
              <span>{(cartTotal * 0.15).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="w-full flex justify-between">
              <span>Total</span>
              <span>{cartTotal.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <PaymentMethod loading={loading} handlePayment={handlePayment} />
      </div>
    </div>
  );
}
