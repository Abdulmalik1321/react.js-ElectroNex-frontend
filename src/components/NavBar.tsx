import { Button } from "@/shadcn/ui/button";
import { ModeToggle } from "../shadcn/mode-toggle";
import { Separator } from "@/shadcn/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  Trash2Icon,
  User,
} from "lucide-react";
import { LocalStorage } from "@/utils";
import { shopContext } from "../Router";
import { useContext } from "react";
import { Stocks } from "@/types";
import { Card } from "@/shadcn/ui/card";
import { Badge } from "@/shadcn/ui/badge";
import { Logo } from "./Logo";

export function NavBar() {
  const { state, dispatch } = useContext(shopContext);

  const navigate = useNavigate();
  const handelLogOutClick = () => {
    LocalStorage("userInfo", null, "delete");
    dispatch({
      type: "logout",
    });
    navigate("/");
  };

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
  return (
    <div className="w-screen flex flex-col items-center justify-center top-0 sticky z-50 bg-[hsl(var(--background))]  dark:shadow-md">
      <div className="w-[80%] flex items-center p-3 justify-between bg-[hsl(var(--background))]">
        <Logo />
        <div className="flex justify-between items-end gap-5 mr-32">
          <Link to={"/"}>
            <Button
              className="text-xl text-[vlc(--primary-foreground)]"
              variant="link">
              Home
            </Button>
          </Link>
          <Link to={"/shop"}>
            <Button
              className="text-xl text-[vlc(--primary-foreground)]"
              variant="link">
              Shop
            </Button>
          </Link>
          <Link to={"/contact-us"}>
            <Button
              className="text-xl text-[vlc(--primary-foreground)]"
              variant="link">
              Contact Us
            </Button>
          </Link>
        </div>
        <div className="flex items-end gap-2">
          <ModeToggle />
          {state.userInfo ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-md ">
                    <Settings />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {state.userInfo && state.userInfo.role == 1 ? (
                    <Link to={"/dashboard"}>
                      <DropdownMenuItem className="gap-2">
                        <LayoutDashboard />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link to={"/profile"}>
                    <DropdownMenuItem className="gap-2">
                      <User />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem
                    className="gap-2"
                    onClick={handelLogOutClick}>
                    <LogOut className="w-5" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* .................................... */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="relative">
                    {state.cart.length ? (
                      <span className="absolute aspect-square flex h-3 w-3 -top-2 -right-2">
                        <span className="animate-ping absolute inline-flex aspect-square size-5 w-5 rounded-full bg-sky-400 opacity-50"></span>
                        <span className="relative flex justify-center items-center rounded-full aspect-square size-5  !w-5 bg-sky-500">
                          {state.cart.length}
                        </span>
                      </span>
                    ) : (
                      <></>
                    )}

                    <ShoppingCart />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* .................................... */}
                  {state.cart
                    ?.filter(
                      (cartItem: Stocks, index: number, self: Stocks[]) =>
                        index ===
                        self.findIndex(
                          (item) => item.stockId === cartItem.stockId
                        )
                    )
                    .map((cartItem: Stocks, index: number) => {
                      return (
                        <DropdownMenuItem
                          key={`${cartItem.stockId}-${index}`}
                          className="gap-5">
                          <Card
                            className="size-16 bg-contain bg-no-repeat bg-center"
                            style={{
                              backgroundImage: `url(${cartItem.url})`,
                            }}
                          />
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <p>{cartItem.productName}</p>-
                              <span>
                                Qty: {calculateQuantity(cartItem.stockId)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Badge
                                className="rounded-sm mt-1 mr-2"
                                variant="outline">
                                {cartItem.price} SAR
                              </Badge>
                              <Badge
                                className="rounded-sm mt-1 mr-2"
                                variant="outline">
                                {cartItem.size}
                              </Badge>
                              <span
                                style={{
                                  backgroundColor: `#${cartItem.color}`,
                                }}
                                className={`size-4 border border-muted-foreground rounded-full inline-block`}></span>
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              removeFromCart(cartItem.stockId);
                            }}
                            variant="destructive">
                            <Trash2Icon />
                          </Button>
                        </DropdownMenuItem>
                      );
                    })}

                  <DropdownMenuItem>
                    {state.cart.length === 0 ? (
                      <Button className="w-full">Cart Is Empty</Button>
                    ) : (
                      <Link to={"/cart"} className="w-full">
                        <Button className="w-full">Open Cart</Button>
                      </Link>
                    )}
                  </DropdownMenuItem>
                  {/* .................................... */}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to={"/login"}>
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
      <Separator />
    </div>
  );
}
