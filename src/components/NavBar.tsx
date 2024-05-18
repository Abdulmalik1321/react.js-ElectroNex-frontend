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
  AlignJustify,
  FileHeart,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { LocalStorage } from "@/utils";
import { shopContext } from "../Router";
import { useContext } from "react";
import { Stocks } from "@/types";
import { Card } from "@/shadcn/ui/card";
import { Badge } from "@/shadcn/ui/badge";

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

  const removeFromCart = (cartItemId: number) => {
    const newCart = state.cart.filter((item: Stocks) => {
      item.cartItemId !== cartItemId;
    });

    console.log(newCart);

    LocalStorage("cart", newCart);
    dispatch({
      type: "removeFromCart",
      payload: newCart,
    });
  };
  return (
    <div className="w-screen flex flex-col items-center justify-center -top-52 sticky z-50 bg-[hsl(var(--background))]  dark:shadow-md">
      <div className="w-[80%] flex items-center p-3 justify-between bg-[hsl(var(--background))] bg-transparent">
        <div className="flex items-end">
          <h1 className="text-5xl">
            Electronics<strong className="text-primary">Hub</strong>
          </h1>
        </div>
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

                  <Link to={"/wishlist"}>
                    <DropdownMenuItem className="gap-2">
                      <FileHeart />
                      <span>Wishlist</span>
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
                  <Button>
                    <ShoppingCart />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* .................................... */}

                  {state.cart?.map((cartItem: Stocks) => {
                    return (
                      <DropdownMenuItem
                        key={cartItem.cartItemId}
                        className="gap-5">
                        <Card
                          className="size-16 bg-contain"
                          style={{
                            backgroundImage: `url(${cartItem.url})`,
                          }}
                        />
                        <div className="text-left">
                          <p>{cartItem.productName}</p>
                          <Badge className="rounded-sm mt-1" variant="outline">
                            {cartItem.price.toFixed(2).toLocaleString()} SAR
                          </Badge>
                        </div>
                        <Button
                          onClick={() => {
                            removeFromCart(cartItem.cartItemId);
                          }}
                          variant="default">
                          <X />
                        </Button>
                      </DropdownMenuItem>
                    );
                  })}
                  <DropdownMenuItem>
                    <Button className="w-full">Checkout</Button>
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
