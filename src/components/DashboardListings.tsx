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
import { Carousel, CarouselContent } from "@/shadcn/ui/carousel";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/shadcn/ui/table";
import { Category, Stocks } from "@/types";
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
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shadcn/ui/product-sheet";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { LoadingButton } from "@/shadcn/ui/loadingbutton";
import { Label } from "@/shadcn/ui/label";

export function DashboardListings() {
  const queryClient = useQueryClient();
  const { state } = useContext(shopContext);
  const [page, setPage] = useState<number>(0);

  // ?${search ? `&searchTerm=${search}` : ""}${`&limit=${
  //   page ? 20 : 21
  // }&offset=${page}`}
  const getStocks = async () => {
    try {
      const res = await api.get(`/stocks/user/${state.userInfo.id}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const deleteStock = async (productId: string) => {
    try {
      const res = await api.delete(`/stocks/${productId}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handelDeleteStock = async (id: string) => {
    await deleteStock(id);
    queryClient.invalidateQueries({ queryKey: ["Stocks"] });
  };

  const queryMultiple = () => {
    const res1 = useQuery<Stocks[]>({
      queryKey: ["Stocks"],
      queryFn: getStocks,
    });
    return [res1];
  };

  const [{ data: stocks, error: stocksError }] = queryMultiple();
  console.log(stocks);

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="bg-background">
      <CardHeader className="flex justify-between flex-row">
        <div>
          <CardTitle>Listings</CardTitle>
          <CardDescription>
            Manage your listings and view their sales performance.
          </CardDescription>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Listing</span>
            </Button>
          </SheetTrigger>
          <CreateEdit editStock={null} />
        </Sheet>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Options</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>quantity</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks?.map((stock: any) => {
              return (
                <TableRow key={stock.id}>
                  <TableCell className="table-cell">
                    <Carousel className="size-20 flex items-center">
                      <CarouselContent className="-ml-1">
                        {stock.images.map((image: any) => {
                          return (
                            <img
                              key={`img-${image[0]}`}
                              className="h-full object-cover"
                              src={image.url}
                              alt=""
                            />
                          );
                        })}
                      </CarouselContent>
                    </Carousel>
                  </TableCell>
                  <TableCell className="font-medium">
                    {stock.productName}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center gap-2 w-fit">
                      <span
                        style={{ backgroundColor: `#${stock.color}` }}
                        className={`size-4 rounded-full block cursor-pointer border border-muted-foreground group-hover:opacity-100 transition-opacity`}></span>
                      <Badge variant="outline">{stock.size}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{stock.condition}</Badge>
                  </TableCell>
                  <TableCell>
                    {stock.price.toFixed(2).toLocaleString()}
                  </TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                  <TableCell>
                    {new Date(stock.createdAt).toLocaleDateString()}
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
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full cursor-auto justify-start p-2">
                              Edit
                            </Button>
                          </SheetTrigger>
                          <CreateEdit editStock={stock} />
                        </Sheet>
                        <DropdownMenuItem asChild>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this account and remove
                                  there data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    handelDeleteStock(stock.id);
                                  }}>
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {stocksError && <p className="text-red-500">{stocksError.message}</p>}
      </CardContent>

      <CardFooter>
        {/* <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> stocks
        </div> */}
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              {page > 0 ? (
                <PaginationPrevious
                  onClick={() => {
                    setPage(page - 1);
                    setTimeout(() => {
                      queryClient.invalidateQueries({ queryKey: ["Stocks"] });
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
              {stocks?.length >= 20 ? (
                <PaginationNext
                  onClick={() => {
                    if (stocks.length >= 20) {
                      setPage(page + 1);
                      setTimeout(() => {
                        queryClient.invalidateQueries({
                          queryKey: ["Stocks"],
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

export function CreateEdit({
  editStock,
  productIdProp = "",
}: {
  editStock: Stocks;
  productIdProp: string;
}) {
  const { state } = useContext(shopContext);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const getCategories = async () => {
    try {
      const res = await api.get("/categories");
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const getBrands = async () => {
    try {
      const res = await api.get("/brands");
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const queryMultiple = () => {
    const res1 = useQuery<any>({
      queryKey: ["Categories"],
      queryFn: getCategories,
    });
    const res2 = useQuery<any>({
      queryKey: ["Brands"],
      queryFn: getBrands,
    });

    return [res1, res2];
  };

  const [
    { data: categories, error: categoriesError },
    { data: brands, error: brandsError },
  ] = queryMultiple();

  const [variantInputs, setVariantInputs] = useState<any>({
    userId: state.userInfo.id,
    productId: productIdProp,
    price: "",
    quantity: "",
    size: "",
    color: "",
    condition: "",
    images: [],
  });

  const createStock = async (newStock: Stocks) => {
    console.log(newStock);

    try {
      const res = await api.post(`/stocks`, newStock, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      window.location.reload();
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const updateStock = async (productId: string, newStock: Stocks) => {
    try {
      const res = await api.put(`/stocks/${productId}`, newStock, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      window.location.reload();
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const valueName = e.target.name.split("-");
    const value = e.target.value;
    const col = valueName[0];

    const newValues: any = variantInputs;

    if (col === "images") {
      const valuesTemp = value.split(" ");
      const newValuesTemp = [];
      for (let i = 0; i < valuesTemp.length; i++) {
        newValuesTemp.push({
          url: valuesTemp[i],
          isMain: i === 0 ? true : false,
        });
      }

      newValues[col] = newValuesTemp;
    } else {
      newValues[col] = value;
    }
    newValues.productId = productIdProp;
    console.log(newValues);

    setVariantInputs(newValues);
  };

  const handleSubmit = async () => {
    editStock
      ? await updateStock(editStock.id, {
          name: variantInputs.name,
          description: variantInputs.description,
          status: variantInputs.status,
          categoryId: variantInputs.categoryId,
          brandId: variantInputs.brandId,
        })
      : await createStock(variantInputs);
    setLoading(false);
    queryClient.invalidateQueries({ queryKey: ["Stocks"] });
  };

  return (
    <SheetContent className="overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Create/Edit Listings</SheetTitle>
      </SheetHeader>

      <Card x-chunk="dashboard-07-chunk-1">
        <CardHeader className="flex-row justify-between">
          <div>
            <CardTitle>Listing</CardTitle>
            <CardDescription>
              Lipsum dolor sit amet, consectetur adipiscing elit
            </CardDescription>
          </div>
          <div className="w-72">
            <Label>Product ID:</Label>
            <Input
              disabled={productIdProp ? true : false}
              defaultValue={productIdProp}
              name={`productId`}
              onChange={handleChange}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Images</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Input name={`price`} onChange={handleChange} />
                </TableCell>
                <TableCell>
                  <Input name={`quantity`} onChange={handleChange} />
                </TableCell>
                <TableCell>
                  <Input name={`size`} onChange={handleChange} />
                </TableCell>
                <TableCell>
                  <Input name={`color`} onChange={handleChange} />
                </TableCell>
                <TableCell>
                  <Input name={`condition`} onChange={handleChange} />
                </TableCell>
                <TableCell>
                  <Input name={`images`} onChange={handleChange} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <LoadingButton
        className="mt-10"
        onClick={() => {
          handleSubmit();
          setLoading(true);
        }}
        loading={loading}
        type="submit">
        Save changes
      </LoadingButton>
    </SheetContent>
  );
}
