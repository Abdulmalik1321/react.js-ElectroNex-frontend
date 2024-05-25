import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "@/api";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { LoadingButton } from "@/shadcn/ui/loadingbutton";
import { Badge } from "@/shadcn/ui/badge";

import { LoginInfo, LoginProps } from "@/types";
import { LocalStorage } from "@/utils";
import { Logo } from "@/components/logo";

export function Login({ handelLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    const value = e.target.value;
    const type = e.target.type;
    if (type === "email") setEmail(value);
    if (type === "password") setPassword(value);
  };

  const handelSubmit = async () => {
    const res = await login({ email: email, password: password });
    LocalStorage("userInfo", res);

    handelLogin({
      type: "login",
      payload: res,
    });
    navigate("/");
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
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
            {error && (
              <Badge className="justify-center" variant="destructive">
                {error}
              </Badge>
            )}
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={handelInput}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  //   href="/forgot-password"
                  className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={handelInput}
              />
            </div>
            <LoadingButton
              loading={loading}
              onClick={() => {
                setLoading(true);
                handelSubmit();
              }}
              type="submit"
              className="w-full">
              Login
            </LoadingButton>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/sign-up"}>
              <Button variant="link" className="underline">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
