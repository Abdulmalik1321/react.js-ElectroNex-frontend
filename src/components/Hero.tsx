import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { motion } from "framer-motion";
import { BatteryCharging, Wifi } from "lucide-react";

import React from "react";
import { FlipWords } from "../shadcn/ui/flip-words";

export function Hero() {
  const words = ["Buy", "Sell", "Fix"];
  return (
    <section className="mt-5 h-screen w-full">
      <div className="w-full h-[88%] grid grid-cols-12 gap-5 items-center justify-center">
        <div className="flex flex-col justify-center items-start text-left col-span-6">
          <h1 className="z-10 text-8xl">
            Electronics<strong>Hub</strong>
          </h1>
          <br />
          <br />
          <div className="text-5xl font-normal z-10  w-[95%]">
            <span>A Marketplace to</span>
            <strong>
              <FlipWords words={words} />
            </strong>
            <br />
            <span>Your Electronics</span>
          </div>
        </div>
        <div className="col-span-6 h-full gap-5 grid grid-cols-2 mt-52">
          <Card className=" w-full bg-transparent backdrop-blur-3xl bg-[url(https://res.cloudinary.com/dbgwe94vv/image/upload/v1715988663/iphone15-pro1_q7hwfi.webp)] [background-position-y:125%] bg-contain bg-no-repeat bg-center relative">
            <CardHeader>
              <CardTitle>iPhone 15 Pro</CardTitle>
              <CardDescription>
                Titanium. So strong. So light. So Pro.
              </CardDescription>
            </CardHeader>
            <CardFooter className="absolute bottom-0 right-0">
              <Button>Buy Now</Button>
            </CardFooter>
          </Card>

          <Card className=" w-full bg-transparent backdrop-blur-3xl bg-[url(https://res.cloudinary.com/dbgwe94vv/image/upload/v1715990265/103375_original_local_1200x1050_v3_converted_hxmz5k.webp)] [background-position-y:85px] bg-contain bg-no-repeat bg-center relative">
            <CardHeader>
              <CardTitle>Sony WH-1000XM5</CardTitle>
              <CardDescription>YOUR WORLD. NOTHING ELSE.</CardDescription>
            </CardHeader>
            <CardFooter className="absolute bottom-0 right-0">
              <Button>Buy Now</Button>
            </CardFooter>
          </Card>

          <Card className="h-1/2 w-full col-span-2 bg-transparent backdrop-blur-3xl bg-[url(https://res.cloudinary.com/dbgwe94vv/image/upload/v1715988653/ASUS-Zephyrus1_m82tyq.webp)] bg-contain bg-no-repeat bg-center relative">
            <CardHeader>
              <CardTitle>ASUS Zephyrus</CardTitle>
              <CardDescription>For Those Who Dare!</CardDescription>
            </CardHeader>
            <CardFooter className="absolute bottom-0 right-0">
              <Button>Buy Now</Button>
            </CardFooter>
          </Card>
        </div>

        {/* <Card className="col-span-3 relative">
          <CardHeader>
            <CardTitle>
              Electronics<strong>Hub</strong>
            </CardTitle>
            <CardDescription>
              Save money and upgrade your tech today
            </CardDescription>
          </CardHeader>

          <CardContent>
            Dive into our wide range of electronics to find the perfect device.
          </CardContent>

          <CardFooter className="absolute bottom-0 right-0">
            <Button
              className=" border border-[hsl(var(--primary))]"
              variant="ghost">
              Start shopping now!
            </Button>
          </CardFooter>
        </Card> */}

        {/* <Card className="col-span-3 relative">
          <CardHeader>
            <CardTitle>Transform Your Tech</CardTitle>
            <CardDescription>
              Sell, Earn, and Contribute to Sustainability!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Sell your old electronics easily and securely, and get the best
              returns.
            </p>
          </CardContent>
          <CardFooter className="absolute bottom-0 right-0">
            <Button
              className=" border border-[hsl(var(--primary))]"
              variant="ghost">
              Learn More
            </Button>
          </CardFooter>
        </Card>*/}
      </div>

      {/* <h1 className="scroll-m-20 pb-2 text-3xl font-normal mt-5 text-center">
        Where Quality Meets Sustainability – From the latest{" "}
        <strong>Smartphones</strong> 📱 to high-performance{" "}
        <strong>Laptops</strong> 💻. We offer a wide range of brand new products
        as well as quality-assured used products to fit every budget.
      </h1> */}
    </section>
  );
}
