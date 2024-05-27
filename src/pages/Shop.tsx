import { ChangeEvent, useContext, useState } from "react";

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ShopView } from "@/components/ShopView";

import { shopContext } from "../Router";
import { Separator } from "@/shadcn/ui/separator";
import api from "@/api";
import { Category, Product } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Input } from "@/shadcn/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";
import { debounce } from "lodash";
import { ListFilterIcon, Loader2 } from "lucide-react";
import { ScrollRestoration, useSearchParams } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/shadcn/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Button } from "@/shadcn/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/ui/sheet";
import { Checkbox } from "@/shadcn/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";

export function Shop() {
  const { state } = useContext(shopContext);
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSearch = searchParams.get("searchTerm") || "";

  const [filters, setFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(defaultSearch);
  const [sortBy, setSortBy] = useState<string>("0");
  const [page, setPage] = useState<number>(0);

  const handelSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    setSearchParams({ ...searchParams, searchTerm: value });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["ShopPage"] });
    }, 100);
  };

  const handelFilters = () => {
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["ShopPage"] });
    }, 100);
  };

  const handelSort = (value: string) => {
    setSortBy(value);
    setLoading(true);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["ShopPage"] });
    }, 100);
  };

  const debouncedOnChange = debounce(handelSearchInput, 500);

  const getProducts = async () => {
    try {
      const res = await api.get(
        `/products?${`sort=${sortBy}`}${search ? `&searchTerm=${search}` : ""}${
          categoryFilters.length > 0
            ? `&categoryFilter=${categoryFilters.join("-")}`
            : ""
        }${
          brandFilters.length > 0
            ? `&brandFilter=${brandFilters.join("-")}`
            : ""
        }${`&limit=${page ? 20 : 21}&offset=${page}`}`
      );
      setLoading(false);
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

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

  // Queries

  const queryMultiple = () => {
    const res1 = useQuery<any>({
      queryKey: ["Categories"],
      queryFn: getCategories,
    });
    const res2 = useQuery<any>({
      queryKey: ["Brands"],
      queryFn: getBrands,
    });
    const res3 = useQuery<any>({
      queryKey: ["ShopPage"],
      queryFn: getProducts,
    });

    return [res1, res2, res3];
  };

  const [
    { data: categories, error: categoriesError },
    { data: brands, error: brandsError },
    { data: products, error: productsError },
  ] = queryMultiple();

  console.log(products);

  return (
    <main className="md:w-[80%] flex flex-col justify-center items-center xxs:w-[95%]">
      <NavBar />
      <div className="flex items-center w-full mt-12 pl-12 pr-12 justify-between">
        <div className="flex justify-start items-center gap-5 ">
          <p className="text-3xl">
            <strong>Products</strong>
          </p>
          <Separator
            className="bg-[hsl(var(--foreground))] h-10"
            orientation="vertical"
          />
          <Select defaultValue="0" onValueChange={handelSort}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price</SelectLabel>
                <SelectItem value="0">Low To High</SelectItem>
                <SelectItem value="1">High To Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          -
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ListFilterIcon className="size-5" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel className="text-xl">
                Category
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="mb-2" />
              {categories?.map((category: Category, index: number) => {
                const checked = categoryFilters.includes(category.name)
                  ? true
                  : false;
                return (
                  <div
                    key={`${category.name}-${index}`}
                    className="flex items-center space-x-2 ml-2 mb-2">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) => {
                        value
                          ? setCategoryFilters([
                              ...categoryFilters,
                              category.name,
                            ])
                          : setCategoryFilters(
                              categoryFilters.filter(
                                (filter) => filter !== category.name
                              )
                            );
                        setLoading(true);
                        handelFilters();
                      }}
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {category.name}
                    </label>
                  </div>
                );
              })}

              <DropdownMenuLabel className="mt-6 text-xl">
                Brand
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="mb-2" />
              {brands?.map((brand: Category, index: number) => {
                const checked = brandFilters.includes(brand.name)
                  ? true
                  : false;
                return (
                  <div
                    key={`${brand.name}-${index}`}
                    className="flex items-center space-x-2 ml-2 mb-2">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) => {
                        value
                          ? setBrandFilters([...brandFilters, brand.name])
                          : setBrandFilters(
                              brandFilters.filter(
                                (filter) => filter !== brand.name
                              )
                            );
                        setLoading(true);
                        handelFilters();
                      }}
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {brand.name}
                    </label>
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-1/3 flex items-center relative group">
          {loading ? (
            <Loader2 className="animate-spin size-8 absolute -left-10" />
          ) : (
            <></>
          )}
          <Input
            onChange={(e) => {
              debouncedOnChange(e);
              setLoading(true);
            }}
            className=""
            placeholder="&#x1F50D; Search"
            type="search"
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5 mt-6 w-full justify-center min-h-96">
        {!products ? (
          !productsError ? (
            [...Array(20)].map((num, index) => (
              <SkeletonCard key={`BestSellers-${num}-${index}`} />
            ))
          ) : (
            <p className="ml-1 text-red-500">{productsError.message}</p>
          )
        ) : (
          <ShopView products={products} numberOfProducts={99} />
        )}
        {products?.length === 0 && (
          <span className="col-span-5 text-center mt-24">
            No Products Found!
          </span>
        )}
      </div>
      <Pagination className="mt-12">
        <PaginationContent>
          <PaginationItem>
            {page > 0 ? (
              <PaginationPrevious
                onClick={() => {
                  setPage(page - 1);
                  setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ["ShopPage"] });
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
            {products?.length >= 20 ? (
              <PaginationNext
                onClick={() => {
                  console.log(products.length);

                  if (products.length >= 20) {
                    setPage(page + 1);
                    setTimeout(() => {
                      queryClient.invalidateQueries({ queryKey: ["ShopPage"] });
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
      <Footer />
      <ScrollRestoration />
    </main>
  );
}
