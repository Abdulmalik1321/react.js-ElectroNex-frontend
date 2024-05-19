import { MoreHorizontal, Plus } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";

import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { NavBar } from "@/components/NavBar";
import api from "@/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { shopContext } from "../Router";
import { ChangeEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";

export function Wishlist() {
  const { state } = useContext(shopContext);
  //   const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const getWishlists = async () => {
    try {
      const res = await api.get(`/wishlist`);
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const deleteWishlists = async (wishlistId: string) => {
    try {
      const res = await api.delete(`/wishlist/${wishlistId}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const createWishlists = async (wishlistName: string | undefined) => {
    try {
      const res = await api.post(
        `/wishlist`,
        { name: wishlistName, userId: state.userInfo.id },
        {
          headers: { Authorization: `Bearer ${state.userInfo.token}` },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handleCreateWishlists = async (wishlistName: string | undefined) => {
    await createWishlists(wishlistName);
    queryClient.invalidateQueries({ queryKey: ["WishList"] });
  };

  const handleDeleteWishlists = async (wishlistId: string) => {
    await deleteWishlists(wishlistId);
    queryClient.invalidateQueries({ queryKey: ["WishList"] });
  };

  const handleUpdateWishlists = async (
    wishlistName: string | undefined,
    wishlistId: string
  ) => {
    await updateWishlists(wishlistName, wishlistId);
    queryClient.invalidateQueries({ queryKey: ["WishList"] });
  };

  const updateWishlists = async (
    wishlistName: string | undefined,
    wishlistId: string
  ) => {
    try {
      const res = await api.put(
        `/wishlist/${wishlistId}`,
        { name: wishlistName, userId: state.userInfo.id },
        {
          headers: { Authorization: `Bearer ${state.userInfo.token}` },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  // Queries
  const { data, error } = useQuery<any>({
    queryKey: ["WishList"],
    queryFn: getWishlists,
  });

  const [newWishlistInput, setNewWishlistInput] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewWishlistInput(e.target.value);
  };

  return (
    <main className="md:w-[80%]  xxs:w-[95%] flex flex-col items-center">
      <NavBar />
      <Card className="mt-12 w-full">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>WishLists</CardTitle>
            <CardDescription>
              Manage your WishList and view your favorite products.
            </CardDescription>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="size-5" />
                Add New Wishlist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add a New Wishlist</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-start gap-3 mt-5">
                <Label htmlFor="name" className="text-right">
                  WishList Name:
                </Label>
                <Input onChange={handleChange} id="name" />
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button
                    type="submit"
                    className="gap-1"
                    onClick={() => {
                      handleCreateWishlists(newWishlistInput);
                    }}>
                    <Plus className="size-4" />
                    Add
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex justify-between">
                  <span>Name</span>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length == 0 ? (
                <p className="mt-5">You Do Not Have Any Wishlists</p>
              ) : (
                data?.map((wishlist: any) => {
                  return (
                    // <Link
                    //   className="flex w-full"
                    //   key={wishlist.id}
                    //   to={`/wishlist/${wishlist.id}`}>
                    <TableRow
                      key={wishlist.id}
                      className="w-full flex justify-between">
                      <TableCell className="font-medium">
                        {wishlist.name}
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="p-2 pt-0 pb-0 cursor-default justify-start w-full ">
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Wishlist</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col items-start gap-3 mt-5">
                                  <Label htmlFor="name" className="text-right">
                                    WishList Name:
                                  </Label>
                                  <Input
                                    onChange={handleChange}
                                    defaultValue={wishlist.name}
                                    id="name"
                                  />
                                </div>
                                <DialogFooter>
                                  <DialogClose>
                                    <Button
                                      type="submit"
                                      className="gap-1"
                                      onClick={() => {
                                        handleUpdateWishlists(
                                          newWishlistInput,
                                          wishlist.id
                                        );
                                      }}>
                                      Edit
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <DropdownMenuItem
                              onClick={() => {
                                handleDeleteWishlists(wishlist.id);
                              }}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    // </Link>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {/* <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>{data?.length}</strong>{" "}
            wishlists
          </div> */}
        </CardFooter>
      </Card>
    </main>
  );
}
