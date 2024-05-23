import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { easeInOut, motion } from "framer-motion";

import { FlipWords } from "../shadcn/ui/flip-words";

export function Hero() {
  const words = ["Buy", "Sell", "Fix"];
  return (
    <section className="mt-5 h-screen w-full">
      <div className="w-full h-[88%] grid grid-cols-12 gap-5 items-center justify-center">
        <div className="flex flex-col justify-center items-start text-left col-span-6 font-light">
          {/* <h1 className="z-10 text-9xl">
            Electro<strong>Nex</strong>
          </h1>
          <br />
          <br /> */}
          <motion.div
            className="flex rounded-lg"
            initial={{ opacity: 0, scale: 1, translateY: 50 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{
              duration: 1,
              delay: 0.05,
              ease: [0.2, 0.71, 0.2, 1.01],
            }}>
            <div className="text-7xl font-normal z-10">
              <span>
                A Platform to <br /> Seamlessly
              </span>
              <strong className="font-extrabold">
                <FlipWords timeout={700} words={words} />
              </strong>
              <br />
              <span>Your Electronics!</span>
            </div>
          </motion.div>
        </div>
        <div className="col-span-6 h-full gap-5 grid grid-cols-2 mt-52">
          <motion.div
            className="flex backdrop-blur-3xl rounded-lg"
            initial={{ opacity: 0, scale: 1, translateY: 50 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: easeInOut,
            }}>
            <Card className=" w-full bg-transparent bg-[url(https://res.cloudinary.com/dbgwe94vv/image/upload/v1715988663/iphone15-pro1_q7hwfi.webp)] [background-position-y:125%] bg-contain bg-no-repeat bg-center relative">
              <CardHeader>
                <CardTitle>iPhone 15 Pro</CardTitle>
                <CardDescription>
                  Titanium. So strong. So light. So Pro.
                </CardDescription>
              </CardHeader>
              <CardFooter className="absolute bottom-0 right-0">
                <Button variant="secondary">Buy Now</Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            className="flex backdrop-blur-3xl rounded-lg"
            initial={{ opacity: 0, scale: 1, translateY: 50 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: easeInOut,
            }}>
            <Card className=" w-full bg-transparent bg-[url(https://res.cloudinary.com/dbgwe94vv/image/upload/v1715990265/103375_original_local_1200x1050_v3_converted_hxmz5k.webp)] [background-position-y:85px] bg-contain bg-no-repeat bg-center relative">
              <CardHeader>
                <CardTitle>Sony WH-1000XM5</CardTitle>
                <CardDescription>YOUR WORLD. NOTHING ELSE.</CardDescription>
              </CardHeader>
              <CardFooter className="absolute bottom-0 right-0">
                <Button variant="secondary">Buy Now</Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            className="flex col-span-2 backdrop-blur-3xl rounded-lg"
            initial={{ opacity: 0, scale: 1, translateY: 50 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: easeInOut,
            }}>
            <Card className="h-1/2 w-full  bg-transparent  bg-[url(https://res.cloudinary.com/dbgwe94vv/image/upload/v1715988653/ASUS-Zephyrus1_m82tyq.webp)] bg-contain bg-no-repeat bg-center relative">
              <CardHeader>
                <CardTitle>ASUS Zephyrus</CardTitle>
                <CardDescription>For Those Who Dare!</CardDescription>
              </CardHeader>
              <CardFooter className="absolute bottom-0 right-0">
                <Button variant="secondary">Buy Now</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
