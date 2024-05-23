import { File, Home, ListFilter, Search } from "lucide-react";

import { Button } from "@/shadcn/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Input } from "@/shadcn/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";

import { Link } from "react-router-dom";

import { DashboardProducts } from "@/components/DashboardProducts";
import { ChangeEvent, useContext, useState } from "react";
import { shopContext } from "@/Router";
import { DashboardOrders } from "@/components/DashboardOrders";
import { DashboardUsers } from "@/components/DashboardUsers";
import { useQueryClient } from "@tanstack/react-query";

export function Dashboard() {
  const { state } = useContext(shopContext);

  const [search, setSearch] = useState<string>("");

  const queryClient = useQueryClient();

  const handelSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    console.log(search);

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["Products"] });
    }, 100);
  };

  return state.userInfo.role === 1 ? (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center gap-5">
              <Link to={"/"}>
                <Button variant="secondary" className="flex items-center gap-2">
                  <Home className="w-5" />
                  Home
                </Button>
              </Link>
              <TabsList>
                <TabsTrigger value="all">Products</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>

                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    onChange={handelSearchInput}
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  />
                </div>
              </div>
            </div>
            <TabsContent value="all">
              <DashboardProducts search={search} />
            </TabsContent>
            <TabsContent value="users">
              <DashboardUsers />
            </TabsContent>
            <TabsContent value="orders">
              <DashboardOrders />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  ) : (
    <h1>You Are Not Authorized to Open The Dashboard</h1>
  );
}
