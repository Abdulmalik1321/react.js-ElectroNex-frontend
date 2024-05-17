import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";

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
import { useQuery } from "@tanstack/react-query";
import { shopContext } from "../Router";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeftFromLineIcon } from "lucide-react";

export function WishlistDetails() {
  const { state } = useContext(shopContext);
  const params = useParams();

  const getWishlistData = async () => {
    try {
      const res = await api.get(`/wishlist/${params.wishlistId}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  // Queries
  const { data, error } = useQuery<any>({
    queryKey: ["WishListData"],
    queryFn: getWishlistData,
  });

  return (
    <main className="md:w-[80%]  xxs:w-[95%]">
      <NavBar />
      <Card className="mt-12">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle className="flex gap-1 items-center">
              <ArrowLeftFromLineIcon />
              {data?.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
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
              <TableRow className="w-full">
                <TableCell className="font-medium">Product 1</TableCell>
                <TableCell>
                  <Button variant="ghost">Delete</Button>
                </TableCell>
              </TableRow>
              <TableRow className="w-full">
                <TableCell className="font-medium">Product 2</TableCell>
                <TableCell>
                  <Button variant="ghost">Delete</Button>
                </TableCell>
              </TableRow>
              <TableRow className="w-full">
                <TableCell className="font-medium">Product 3</TableCell>
                <TableCell>
                  <Button variant="ghost">Delete</Button>
                </TableCell>
              </TableRow>
              {/* {data?.products.length == 0 ? (
                <p className="mt-5">You Do Not Have Any Products in Here</p>
              ) : (
                data?.products.map((wishlist: any) => {
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
                })
              )} */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
