import { shopContext } from "@/Router";
import api from "@/api";
import { Badge } from "@/shadcn/ui/badge";
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
import { Category } from "@/types";
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
  DialogDescription,
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

export function DashboardCategories() {
  const queryClient = useQueryClient();
  const { state } = useContext(shopContext);
  const [page, setPage] = useState<number>(0);

  const [categoryInput, setCategoryInput] = useState({
    name: "",
    description: "",
  });

  const handelCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { name } = e.target;

    setCategoryInput({ ...categoryInput, [name]: value });
  };

  const CategoryCreate = async (categoryInput: any) => {
    try {
      const res = await api.post(`/categories`, categoryInput, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const CategoryUpdate = async (id: string, categoryInput: any) => {
    try {
      const res = await api.put(`/categories/${id}`, categoryInput, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const getCategories = async () => {
    try {
      const res = await api.get(`/categories`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      const res = await api.delete(`/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handelDeleteCategory = async (id: string) => {
    await deleteCategory(id);
    queryClient.invalidateQueries({ queryKey: ["Categories"] });
  };

  const handelUpdateCategory = async (id: string) => {
    await CategoryUpdate(id, categoryInput);
    queryClient.invalidateQueries({ queryKey: ["Categories"] });
  };

  const handelCreateCategory = async () => {
    await CategoryCreate(categoryInput);
    queryClient.invalidateQueries({ queryKey: ["Categories"] });
  };

  const queryMultiple = () => {
    const res2 = useQuery<any[]>({
      queryKey: ["Categories"],
      queryFn: getCategories,
    });
    return [res2];
  };

  const [{ data: categories, error: categoriesError }] = queryMultiple();

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="bg-background">
      <CardHeader className="flex justify-between flex-row">
        <div>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Manage your categories and view their sales performance.
          </CardDescription>
        </div>

        <Dialog>
          <DialogTrigger className="text-left">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Category</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name:</Label>
                <Input
                  name="name"
                  onChange={handelCategoryChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Description:</Label>
                <Input
                  name="description"
                  onChange={handelCategoryChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button onClick={handelCreateCategory}>Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category ID</TableHead>

              <TableHead className="w-1/5">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category: any) => {
              return (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="w-1/3">
                    {category.description}
                  </TableCell>
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
                              <DialogTitle>Edit Category</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Name:</Label>
                                <Input
                                  name="name"
                                  defaultValue={category.name}
                                  onChange={handelCategoryChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                  Description:
                                </Label>
                                <Input
                                  name="description"
                                  defaultValue={category.description}
                                  onChange={handelCategoryChange}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose>
                                <Button
                                  onClick={() => {
                                    handelUpdateCategory(category.id);
                                  }}>
                                  Save changes
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <DropdownMenuItem
                          onClick={() => {
                            handelDeleteCategory(category.id);
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
        {categoriesError && (
          <p className="text-red-500">{categoriesError.message}</p>
        )}
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
                        queryKey: ["Categories"],
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
              {categories?.length >= 20 ? (
                <PaginationNext
                  onClick={() => {
                    if (categories.length >= 20) {
                      setPage(page + 1);
                      setTimeout(() => {
                        queryClient.invalidateQueries({
                          queryKey: ["Categories"],
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
