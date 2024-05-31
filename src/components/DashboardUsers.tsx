import { shopContext } from "@/Router";
import api from "@/api";

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
import { Category, Order } from "@/types";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";

export function DashboardUsers() {
  const queryClient = useQueryClient();
  const { state } = useContext(shopContext);
  const [page, setPage] = useState<number>(0);
  const [newRole, setNewRole] = useState<string>("");

  const getUsers = async () => {
    try {
      const res = await api.get(`/users`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const res = await api.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const updateUser = async (userId: string, newRole: string, token: string) => {
    try {
      console.log("============");
      console.log(
        `New Role: ${newRole}\n\nUser Id: ${userId}\n\nUser Token: ${token}`
      );
      const res = await api.put(
        `/users/role/${userId}?newRole=${newRole}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handelUserUpdateSubmit = async (userId: string, newRole: string) => {
    await updateUser(userId, newRole, state.userInfo.token);
    queryClient.invalidateQueries({ queryKey: ["Users"] });
  };

  const handelDeleteUser = async (id: string) => {
    await deleteUser(id);
    queryClient.invalidateQueries({ queryKey: ["Users"] });
  };

  const queryMultiple = () => {
    const res2 = useQuery<Order[]>({
      queryKey: ["Users"],
      queryFn: getUsers,
    });
    return [res2];
  };

  const [{ data: users, error: usersError }] = queryMultiple();

  console.log(users);

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="bg-background">
      <CardHeader className="flex justify-between flex-row">
        <div>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage your users and view their sales performance.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: any) => {
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role
                      ? user.role == 1
                        ? "Admin"
                        : "Seller"
                      : "Customer"}
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
                      <DropdownMenuContent
                        className="flex gap-2 flex-col"
                        align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem asChild>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline">Grant Role</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Grant Role</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Please Select Role to Grant
                                  <br />
                                  <br />
                                  <Select
                                    onValueChange={(value) => {
                                      setNewRole(value);
                                    }}>
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        <SelectItem value="0">
                                          Customer
                                        </SelectItem>
                                        <SelectItem value="2">
                                          Seller
                                        </SelectItem>
                                        <SelectItem value="1">Admin</SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    handelUserUpdateSubmit(user.id, newRole);
                                  }}>
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuItem>

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
                                    handelDeleteUser(user.id);
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
        {usersError && <p className="text-red-500">{usersError.message}</p>}
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
                      queryClient.invalidateQueries({ queryKey: ["Users"] });
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
              {users?.length >= 20 ? (
                <PaginationNext
                  onClick={() => {
                    if (users?.length >= 20) {
                      setPage(page + 1);
                      setTimeout(() => {
                        queryClient.invalidateQueries({
                          queryKey: ["Users"],
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
