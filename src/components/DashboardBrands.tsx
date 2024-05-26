import { shopContext } from "@/Router";
import api from "@/api";

import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shadcn/ui/card";
import { Label } from "@radix-ui/react-label";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/shadcn/ui/table";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/shadcn/ui/dropdown-menu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { ChangeEvent, useContext, useState } from "react";
import { Input } from "@/shadcn/ui/input";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/shadcn/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";

export function DashboardBrands() {
  const queryClient = useQueryClient();
  const { state } = useContext(shopContext);
  const [page, setPage] = useState<number>(0);

  const [brandInput, setBrandInput] = useState({
    name: "",
    description: "",
  });

  const handelBrandChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { name } = e.target;

    setBrandInput({ ...brandInput, [name]: value });
  };

  const BrandCreate = async (brandInput: any) => {
    try {
      const res = await api.post(`/brands`, brandInput, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const BrandUpdate = async (id: string, brandInput: any) => {
    try {
      const res = await api.put(`/brands/${id}`, brandInput, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const getBrands = async () => {
    try {
      const res = await api.get(`/brands`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const deleteBrand = async (brandId: string) => {
    try {
      const res = await api.delete(`/brands/${brandId}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handelDeleteBrand = async (id: string) => {
    await deleteBrand(id);
    queryClient.invalidateQueries({ queryKey: ["Brands"] });
  };

  const handelUpdateBrand = async (id: string) => {
    await BrandUpdate(id, brandInput);
    queryClient.invalidateQueries({ queryKey: ["Brands"] });
  };

  const handelCreateBrand = async () => {
    await BrandCreate(brandInput);
    queryClient.invalidateQueries({ queryKey: ["Brands"] });
  };

  const queryMultiple = () => {
    const res2 = useQuery<any[]>({
      queryKey: ["Brands"],
      queryFn: getBrands,
    });
    return [res2];
  };

  const [{ data: brands, error: brandsError }] = queryMultiple();

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="bg-background">
      <CardHeader className="flex justify-between flex-row">
        <div>
          <CardTitle>Brands</CardTitle>
          <CardDescription>
            Manage your brands and view their sales performance.
          </CardDescription>
        </div>

        <Dialog>
          <DialogTrigger className="text-left">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Brand</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Edit Brand</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name:</Label>
                <Input
                  name="name"
                  onChange={handelBrandChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Description:</Label>
                <Input
                  name="description"
                  onChange={handelBrandChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button onClick={handelCreateBrand}>Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand ID</TableHead>

              <TableHead className="w-1/5">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands?.map((brand: any) => {
              return (
                <TableRow key={brand.id}>
                  <TableCell className="font-medium">{brand.id}</TableCell>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell className="w-1/3">{brand.description}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <Dialog>
                          <DialogTrigger className="text-left">
                            <Button
                              variant="ghost"
                              className="w-full cursor-auto justify-start p-2">
                              Edit
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="sm:max-w-[450px]">
                            <DialogHeader>
                              <DialogTitle>Edit Brand</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Name:</Label>
                                <Input
                                  name="name"
                                  defaultValue={brand.name}
                                  onChange={handelBrandChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                  Description:
                                </Label>
                                <Input
                                  name="description"
                                  defaultValue={brand.description}
                                  onChange={handelBrandChange}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose>
                                <Button
                                  onClick={() => {
                                    handelUpdateBrand(brand.id);
                                  }}>
                                  Save changes
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <DropdownMenuItem
                          onClick={() => {
                            handelDeleteBrand(brand.id);
                          }}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {brandsError && <p className="text-red-500">{brandsError.message}</p>}
      </CardContent>

      <CardFooter>
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              {page > 0 ? (
                <PaginationPrevious
                  onClick={() => {
                    setPage(page - 1);
                    setTimeout(() => {
                      queryClient.invalidateQueries({
                        queryKey: ["Brands"],
                      });
                    }, 100);
                  }}
                />
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              {brands?.length >= 20 ? (
                <PaginationNext
                  onClick={() => {
                    if (brands.length >= 20) {
                      setPage(page + 1);
                      setTimeout(() => {
                        queryClient.invalidateQueries({
                          queryKey: ["Brands"],
                        });
                      }, 100);
                    }
                  }}
                />
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
