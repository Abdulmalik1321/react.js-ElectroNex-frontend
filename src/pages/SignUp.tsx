import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "@/api";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { LoadingButton } from "@/shadcn/ui/loadingbutton";
import { Badge } from "@/shadcn/ui/badge";

import { LoginInfo, LoginProps, SignUpInfo, SignUpProps } from "@/types";
import { LocalStorage } from "@/utils";
import { Logo } from "@/components/Logo";

export function SignUp({ handelLogin }: LoginProps) {
  const [input, setInput] = useState<SignUpInfo>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    phone: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signUp = async (signUpInfo: SignUpInfo) => {
    try {
      const res = await api.post("/users/signup", signUpInfo);
      return res.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data || "Something went wrong");
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const login = async (loginInfo: LoginInfo) => {
    try {
      const res = await api.post("/users/signin", loginInfo);
      const userData = await api.get(`/users/email/${loginInfo.email}`, {
        headers: {
          Authorization: `Bearer ${res.data}`,
        },
      });
      userData.data.token = res.data;

      return userData.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data || "Something went wrong");
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    const name: string = e.target.name;

    const newInput: any = input;
    newInput[name] = value;
    setInput(newInput);
  };

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await signUp(input);

    console.log("form");

    if (!error) {
      console.log("something");

      const resLogin = await login({
        email: input.email,
        password: input.password,
      });
      LocalStorage("userInfo", resLogin);

      handelLogin({
        type: "login",
        payload: resLogin,
      });
      navigate("/");
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <main className="w-full lg:grid lg:min-h-full lg:grid-cols-2 xl:min-h-full">
      <div className="hidden bg-muted lg:block relative">
        <Logo />
        <img
          src="./src/assets/imgs/iphone15-pro.jpeg"
          alt="Image"
          className="h-dvh w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center w-full">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to register your account
            </p>
          </div>
          <form
            // action="Post"
            onSubmit={handelSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Firs Name</Label>
                <Input
                  name="firstName"
                  type="name"
                  required
                  onChange={handelInput}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Last Name</Label>
                <Input
                  name="lastName"
                  type="name"
                  required
                  onChange={handelInput}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={handelInput}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Phone</Label>
                <Input
                  name="phone"
                  type="phone"
                  placeholder="05########"
                  required
                  onChange={handelInput}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  required
                  onChange={handelInput}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Repeat Password</Label>
                <Input
                  name="repeatPassword"
                  type="password"
                  required
                  onChange={handelInput}
                />
              </div>
              <Button type={"submit"}>
                <LoadingButton loading={loading} className="w-full">
                  Sign Up
                </LoadingButton>
              </Button>
              <Button variant="outline" className="w-full">
                Continue with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            already have an account?{" "}
            <Link to={"/login"}>
              <Button
                variant="link"
                // href="#"
                className="underline">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
