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
import { Category, Product } from "@/types";
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
  SheetFooter,
  SheetClose,
} from "@/shadcn/ui/product-sheet";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Textarea } from "@/shadcn/ui/textarea";
import { LoadingButton } from "@/shadcn/ui/loadingbutton";

export function DashboardProducts() {
  const queryClient = useQueryClient();
  const { state } = useContext(shopContext);

  const getCategories = async () => {
    try {
      const res = await api.get("/categories");
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const res = await api.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handelDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    queryClient.invalidateQueries({ queryKey: ["Products"] });
  };

  const queryMultiple = () => {
    const res1 = useQuery<Category[]>({
      queryKey: ["Categories"],
      queryFn: getCategories,
    });
    const res2 = useQuery<Product[]>({
      queryKey: ["Products"],
      queryFn: getProducts,
    });
    return [res1, res2];
  };

  const [
    { data: categories, error: categoriesError },
    { data: products, error: productsError },
  ] = queryMultiple();
  console.log(products);

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="bg-background">
      <CardHeader className="flex justify-between flex-row">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Product</span>
            </Button>
          </SheetTrigger>
          <CreateEdit editProduct={null} />
        </Sheet>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: any) => {
              console.log(product.images[0]);

              return (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Carousel className="size-20 flex items-center">
                      <CarouselContent className="-ml-1">
                        {product.images.map((image: any) => {
                          return (
                            <img
                              key={`img-${image[0]}`}
                              className="h-full object-cover"
                              src={image[0]}
                              alt=""
                            />
                          );
                        })}
                      </CarouselContent>
                    </Carousel>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {product.price.toFixed(2).toLocaleString()}
                  </TableCell>
                  <TableCell>{product.numberOfSales}</TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
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
                          <CreateEdit editProduct={product} />
                        </Sheet>
                        <DropdownMenuItem
                          onClick={() => {
                            handelDeleteProduct(product.id);
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
        {productsError && (
          <p className="text-red-500">{productsError.message}</p>
        )}
      </CardContent>

      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}

function CreateEdit({ editProduct }: { editProduct: Product }) {
  const { state } = useContext(shopContext);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  console.log(editProduct);

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
    name: "",
    description: "",
    categoryId: "",
    brandId: "",
    status: "",
    newStocks: [
      {
        userId: state.userInfo.id,
        price: "",
        quantity: "",
        size: "",
        color: "",
        condition: "",
        images: [],
      },
    ],
  });

  const createProduct = async (newProduct: Product) => {
    try {
      const res = await api.post(`/products`, newProduct, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      window.location.reload();
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const updateProduct = async (productId: string, newProduct: Product) => {
    try {
      console.log(newProduct.createdAt);

      const res = await api.put(`/products/${productId}`, newProduct, {
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
    const row = Number(valueName[1]);

    const newValues: any = variantInputs;

    if (valueName.length > 1) {
      if (col === "images") {
        const valuesTemp = value.split(" ");
        const newValuesTemp = [];
        for (let i = 0; i < valuesTemp.length; i++) {
          newValuesTemp.push({
            url: valuesTemp[i],
            isMain: i === 0 ? true : false,
          });
        }

        newValues.newStocks[row][col] = newValuesTemp;
      } else {
        newValues.newStocks[row][col] = value;
      }
    } else {
      newValues[col] = value;
    }

    setVariantInputs(newValues);
    console.log(newValues);
  };

  const handleSubmit = async () => {
    editProduct
      ? await updateProduct(editProduct.id, {
          name: variantInputs.name,
          description: variantInputs.description,
          status: variantInputs.status,
          categoryId: variantInputs.categoryId,
          brandId: variantInputs.brandId,
        })
      : await createProduct(variantInputs);
    setLoading(false);
    queryClient.invalidateQueries({ queryKey: ["Products"] });
  };

  return (
    <SheetContent className="overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Create/Edit Products</SheetTitle>
      </SheetHeader>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label>Name</Label>
                  <Input
                    name="name"
                    type="text"
                    className="w-full"
                    defaultValue={editProduct ? editProduct.name : ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Description</Label>
                  <Textarea
                    name="description"
                    className="min-h-32"
                    onChange={handleChange}>
                    {editProduct ? editProduct.description : ""}
                  </Textarea>
                </div>
              </div>
            </CardContent>
          </Card>
          {editProduct === null ? (
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
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
                    {variantInputs.newStocks?.map((num: any, index: number) => (
                      <TableRow key={`ProductVariants-${num}-${index}`}>
                        <TableCell>
                          <Input
                            name={`price-${index}`}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name={`quantity-${index}`}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name={`size-${index}`}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name={`color-${index}`}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name={`condition-${index}`}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name={`images-${index}`}
                            onChange={handleChange}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1"
                  onClick={() => {
                    setVariantInputs((prevVariantInputs: any) => ({
                      ...prevVariantInputs,
                      newStocks: [
                        ...prevVariantInputs.newStocks,
                        {
                          userId: state.userInfo.id,
                          price: "",
                          quantity: "",
                          size: "",
                          color: "",
                          condition: "",
                          images: [],
                        },
                      ],
                    }));
                    console.log(variantInputs);
                  }}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variant
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <></>
          )}
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-2">
            <CardHeader>
              <CardTitle>Product Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="">
                <div className="grid gap-3">
                  <Label>Category</Label>
                  <Select
                    onValueChange={(value) => {
                      setVariantInputs({ ...variantInputs, categoryId: value });
                    }}>
                    <SelectTrigger id="category" aria-label="Select category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category: Category) => {
                        return (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-07-chunk-2">
            <CardHeader>
              <CardTitle>Product Brand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="">
                <div className="grid gap-3">
                  <Label>Brand</Label>
                  <Select
                    onValueChange={(value) => {
                      setVariantInputs({ ...variantInputs, brandId: value });
                    }}>
                    <SelectTrigger id="category" aria-label="Select category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands?.map((brand: any) => {
                        return (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-07-chunk-3">
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label>Status</Label>
                  <Select
                    onValueChange={(value) => {
                      setVariantInputs({ ...variantInputs, status: value });
                    }}>
                    <SelectTrigger id="status" aria-label="Select status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="listed">Listed</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* <SheetClose asChild> */}
          <LoadingButton
            onClick={() => {
              handleSubmit;
              setLoading(true);
            }}
            loading={loading}
            type="submit">
            Save changes
          </LoadingButton>
          {/* </SheetClose> */}
        </div>
      </div>
      <SheetFooter></SheetFooter>
    </SheetContent>
  );
}
