import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shopContext } from "@/Router";
import api from "@/api";

import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";

import { Badge } from "@/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";

export function ThankYou() {
  const params = useParams();
  const { state, dispatch } = useContext(shopContext);

  const getOrder = async () => {
    try {
      const res = await api.get(`/orders/${params.paymentId}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };
  const { data, error } = useQuery<any>({
    queryKey: ["order"],
    queryFn: getOrder,
  });

  console.log(data);

  return (
    <main className="w-full">
      <NavBar />
      <div className="flex flex-col items-center justify-start gap-5 mt-12 md:min-h-[800px] p-4">
        <div>
          <p className="text-5xl text-center">Thank You For Your Order</p>
          <br />
          <br />
          <p>
            Your order number is: <br className="xxs:block md:hidden" />
            <b>{data?.id}</b>
            <br />
            your order well be shipped as soon as possible
          </p>
        </div>

        <Card x-chunk="dashboard-06-chunk-0" className="bg-background mt-12">
          <CardHeader className="flex justify-between flex-row">
            <div>
              <CardTitle>Order Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="xxs:p-0 md:px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="xxs:hidden md:table-cell">
                    Image
                  </TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="xxs:hidden md:table-cell">
                    Options
                  </TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead className="xxs:hidden md:table-cell">
                    Quantity
                  </TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Sold By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.stocks.map((item: any) => {
                  return (
                    <TableRow key={item.stockId}>
                      <TableCell className="xxs:hidden md:table-cell">
                        <Card
                          className="size-24 bg-contain bg-no-repeat bg-center"
                          style={{
                            backgroundImage: `url(${item.image})`,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <p>{item.productName}</p>
                      </TableCell>

                      <TableCell className="xxs:hidden md:table-cell">
                        <div className="flex items-center h-full gap-2">
                          <span
                            style={{ backgroundColor: `#${item.color}` }}
                            className={`size-4 border border-muted-foreground rounded-full inline-block`}></span>
                          <Badge
                            className="rounded-sm m-0 text-sm font-normal"
                            variant="outline">
                            {item.size}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className="rounded-sm m-0 text-sm font-normal"
                          variant="outline">
                          {item.condition}
                        </Badge>
                      </TableCell>

                      <TableCell className="xxs:hidden md:table-cell">
                        <p>{item.quantity}</p>
                      </TableCell>

                      <TableCell>
                        <p>{item.price.toFixed(2)}</p>
                      </TableCell>

                      <TableCell>
                        <p>{item.userName}</p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </div>
      <Footer />
    </main>
  );
}
