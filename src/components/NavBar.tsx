import { Button } from "@/shadcn/ui/button";
import { ModeToggle } from "../shadcn/mode-toggle";
import { Separator } from "@/shadcn/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { ActionType, UserInfo } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { LogOut, PhoneCall, Settings, ShoppingCart, User } from "lucide-react";
import { LocalStorage } from "@/utils";
import { shopContext } from "../Router";
import { useContext } from "react";

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
  return (
    <div className="w-full top-0 sticky z-10">
      <div className="w-full flex items-center p-3 justify-between bg-[hsl(var(--background))]">
        <div className="flex items-end">
          <h1 className="text-5xl">
            Electronics<strong>Hub</strong>
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

          {state.userInfo && state.userInfo.role == 1 ? (
            <Link to={"/dashboard"}>
              <Button
                className="text-xl text-[vlc(--primary-foreground)]"
                variant="link">
                Dashboard
              </Button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-end gap-2">
          <ModeToggle />
          {state.userInfo ? (
            <>
              {" "}
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
                  <Link to={"/profile"}>
                    <DropdownMenuItem className="gap-2">
                      <User />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem className="gap-2">
                    <PhoneCall className="w-5" />
                    <span>Support</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="gap-2"
                    onClick={handelLogOutClick}>
                    <LogOut className="w-5" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to={"/"}>
                <Button>
                  <ShoppingCart />
                </Button>
              </Link>
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
