import { ChangeEvent, useContext, useState } from "react";

import { shopContext } from "../Router";
import { NavBar } from "@/components/NavBar";

import { Card, CardContent } from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
import { ClipboardType, Home, User } from "lucide-react";
import { Wishlist } from "./Wishlist";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/api";
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
import { Input } from "@/shadcn/ui/input";
import { Label } from "@radix-ui/react-label";
import { LocalStorage } from "@/utils";

export function Profile() {
  const queryClient = useQueryClient();
  const { state, dispatch } = useContext(shopContext);

  const [addressInput, setAddressInput] = useState({
    city: "",
    zip: "",
    addressLine: "",
    userId: state.userInfo.id,
  });

  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handelUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { name } = e.target;

    setUserInput({ ...userInput, [name]: value });
  };
  const handelAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { name } = e.target;

    setAddressInput({ ...addressInput, [name]: value });
  };

  const handelAddressSubmit = async () => {
    await createAddress(addressInput);
    queryClient.invalidateQueries({ queryKey: ["Address"] });
  };

  const handelUserUpdateSubmit = async () => {
    const updatedUser = await updateUser(userInput);
    LocalStorage("userInfo", updatedUser);
    dispatch({
      type: "updateUser",
      payload: updatedUser,
    });
    console.log(updatedUser);
  };

  const handelAddressUpdateSubmit = async (addressId: string) => {
    await updateAddress(addressId, addressInput);
    queryClient.invalidateQueries({ queryKey: ["Address"] });
  };

  const createAddress = async (addressInput: any) => {
    try {
      const res = await api.post(`/addresses`, addressInput, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const updateAddress = async (addressId: string, addressInput: any) => {
    try {
      const res = await api.put(`/addresses/${addressId}`, addressInput, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const updateUser = async (userInput: any) => {
    try {
      const res = await api.put(`/users/${state.userInfo.id}`, userInput, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const getAddress = async () => {
    try {
      const res = await api.get(`/addresses/${state.userInfo.id}`, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const { data: address, error: addressError } = useQuery<any>({
    queryKey: ["Address"],
    queryFn: getAddress,
  });

  return (
    <main className="w-full justify-center items-center ">
      <NavBar />
      <div className="flex justify-center items-start w-full  gap-5">
        <div className=" md:w-[80%] xxs:w-[95%] grid grid-cols-2 w-full  gap-5 mt-12">
          <Card className="items-start justify-center flex flex-col w-full pt-12 pb-12">
            <CardContent className="flex items-center gap-8">
              <User className="size-32" />
              <div className="flex flex-col ">
                <div>
                  <p>firstName: {state.userInfo.firstName}</p>
                  <p>lastName :{state.userInfo.lastName}</p>
                  <p>email: {state.userInfo.email}</p>
                  <p>phone: {state.userInfo.phone}</p>
                </div>
                <Dialog>
                  <DialogTrigger className="text-left">
                    <Button className="w-28 mt-3">Edit</Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                      <DialogTitle>Add Address</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">First Name:</Label>
                        <Input
                          name="firstName"
                          onChange={handelUserChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Last Name:</Label>
                        <Input
                          name="lastName"
                          onChange={handelUserChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Phone:</Label>
                        <Input
                          name="phone"
                          onChange={handelUserChange}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose>
                        <Button onClick={handelUserUpdateSubmit}>
                          Save changes
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
            <div className="flex justify-end"></div>
          </Card>

          <Card className="items-start justify-center flex flex-col w-full pt-12 pb-12">
            <CardContent className="flex items-center gap-8">
              <Home className="size-32" />
              <div>
                <Dialog>
                  {address ? (
                    <div>
                      <p>City: {address?.city}</p>
                      <p>Zip Code: {address?.zip}</p>
                      <p>Address: {address?.addressLine}</p>

                      <DialogTrigger asChild>
                        <Button className="w-28 mt-3">Edit</Button>
                      </DialogTrigger>
                    </div>
                  ) : (
                    <div>
                      <p>You Don&apos;t Have Address </p>
                      <br />
                      <DialogTrigger asChild>
                        <Button>Add Address</Button>
                      </DialogTrigger>
                    </div>
                  )}
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Address</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">City:</Label>
                        <Input
                          name="city"
                          onChange={handelAddressChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Zip:</Label>
                        <Input
                          name="zip"
                          onChange={handelAddressChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Address:</Label>
                        <Input
                          name="addressLine"
                          onChange={handelAddressChange}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose>
                        <Button
                          onClick={() => {
                            address
                              ? handelAddressUpdateSubmit(address.id)
                              : handelAddressSubmit();
                          }}>
                          Save changes
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
            <div className="flex justify-end"></div>
          </Card>

          <Wishlist />
        </div>
      </div>
    </main>
  );
}
