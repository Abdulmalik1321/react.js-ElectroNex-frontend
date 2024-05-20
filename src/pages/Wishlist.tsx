import {
  ArrowLeftFromLineIcon,
  Loader2,
  MoreHorizontal,
  Plus,
} from "lucide-react";

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

import api from "@/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { shopContext } from "../Router";
import { ChangeEvent, useContext, useState } from "react";

export function Wishlist() {
  const { state } = useContext(shopContext);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const [wishlistIdState, setWishlistIdState] = useState("wishlist");

  const getWishlistData = async () => {
    try {
      const res = await api.get(`/wishlist/${wishlistIdState}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
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

  const handleGetWishlistData = async (id: string) => {
    setWishlistIdState(id);
    setTimeout(async () => {
      await getWishlistData();
    }, 200);

    queryClient.invalidateQueries({ queryKey: ["WishListData"] });
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

  const queryMultiple = () => {
    const res1 = useQuery<any>({
      queryKey: ["WishList"],
      queryFn: getWishlists,
    });
    const res2 = useQuery<any>({
      queryKey: ["WishListData"],
      queryFn: getWishlistData,
    });
    return [res1, res2];
  };

  const [
    { data: wishlists, error: wishlistserror },
    { data: wishlistData, error: wishlistDataError },
  ] = queryMultiple();

  const [newWishlistInput, setNewWishlistInput] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewWishlistInput(e.target.value);
  };
  console.log(wishlistData);

  return (
    <main className="w-full flex flex-col items-center col-span-2">
      <div className="grid grid-cols-2  gap-5 w-full h-96">
        <Card className="w-full   h-96">
          <CardHeader className="flex flex-row  justify-between">
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
          <CardContent className="overflow-y-scroll h-64">
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
                {wishlists?.length == 0 ? (
                  <p className="mt-5">You Do Not Have Any Wishlists</p>
                ) : (
                  wishlists?.map((wishlist: any) => {
                    return (
                      <TableRow
                        onClick={() => {
                          setWishlistIdState(wishlist.id);
                          handleGetWishlistData(wishlist.id);
                          setLoading(true);
                        }}
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
                                    <Label
                                      htmlFor="name"
                                      className="text-right">
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
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className=" h-96">
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle className="flex gap-1 items-center">
                <ArrowLeftFromLineIcon />
                {wishlistData ? (
                  wishlistData.wishlistName
                ) : loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <></>
                )}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="overflow-y-scroll h-64">
            <Table className="w-full">
              <TableHeader className="w-full">
                <TableRow className="w-full">
                  <TableHead className="w-full flex justify-between">
                    <span>Name</span>
                    <span>Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full">
                <TableRow className="w-full"></TableRow>
                {wishlistData?.products.map((wishlist: any) => {
                  return (
                    <TableRow className="w-full" key={wishlist.id}>
                      <TableCell className="font-medium">
                        {wishlist.name}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost">Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
