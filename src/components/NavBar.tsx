import { Button } from "@/shadcn/ui/button";
import { ModeToggle } from "../shadcn/mode-toggle";
import { Separator } from "@/shadcn/ui/separator";
import { Link } from "react-router-dom";
import { UserInfo } from "@/types";

export function NavBar({ userInfo }: { userInfo: UserInfo }) {
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
        </div>
        <div className="flex items-end gap-2">
          <ModeToggle />
          {userInfo ? (
            <Link to={"/profile"}>
              <Button>{userInfo.firstName}</Button>
            </Link>
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
