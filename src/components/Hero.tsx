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
import { Link } from "react-router-dom";

export function Hero() {
  const words = ["Buy", "Sell", "Fix"];
  return (
    <section className="md:mt-5 xxs:mt-8 md:h-screen xxs:h-[90vh] w-full">
      <div className="w-full xxs:h-fit md:h-[88%] grid md:grid-cols-12 xxs:p-5 gap-5 items-center justify-center">
        <div className="flex flex-col justify-center items-start text-left xxs:col-span-12 md:col-span-6 font-light xxs:mb-8">
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
            <div className="xxs:text-4xl  md:text-7xl font-normal z-10">
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
        <div className="xxs:col-span-12 md:col-span-6 h-full gap-5 grid grid-cols-2 md:mt-52">
          <motion.div
            className="flex backdrop-blur-3xl rounded-lg md:h-full xxs:h-52"
            initial={{ opacity: 0, scale: 1, translateY: 50 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: easeInOut,
            }}>
            <Card className="border-muted w-full bg-transparent bg-[url(https://res.cloudinary.com/dbgwe94vv/image/upload/v1715988663/iphone15-pro1_q7hwfi.webp)] md:[background-position-y:125%] xxs:[background-position-y:125%] bg-contain bg-no-repeat bg-center relative">
              <CardHeader className="md:p-6 xxs:p-3">
                <CardTitle className="xxs:text-base md:text-2xl leading-none">
                  iPhone 15 Pro
                </CardTitle>
                <CardDescription className="xxs:text-xs md:text-sm leading-none xxs:text-nowrap xxs:overflow-hidden xxs:text-ellipsis xxs:w-full whitespace-nowrap">
                  Titanium. So strong. So light. So Pro.
                </CardDescription>
              </CardHeader>
              <CardFooter className="absolute bottom-0 right-0 md:p-6 xxs:p-3">
                <Link
                  to={
                    "/products/1664b0eb-dc3c-10c7-ea13-fd9f131f2423/878681/256GB"
                  }>
                  <Button
                    variant="secondary"
                    className="md:text-sm md:py-2 md:px-4 xxs:text-xs xxs:py-2 xxs:px-2 xxs:h-fit md:h-10">
                    Buy Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            className="flex backdrop-blur-3xl rounded-lg md:h-full xxs:h-52"
            initial={{ opacity: 0, scale: 1, translateY: 50 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: easeInOut,
            }}>
            <Card className="border-muted w-full bg-transparent bg-[url(https://res.cloudinary.com/dbgwe94vv/image/upload/v1715990265/103375_original_local_1200x1050_v3_converted_hxmz5k.webp)] md:[background-position-y:85px] xxs:[background-position-y:60px] bg-contain bg-no-repeat bg-center relative ">
              <CardHeader className="md:p-6 xxs:p-3">
                <CardTitle className="xxs:text-base md:text-2xl leading-none xxs:text-nowrap xxs:overflow-hidden xxs:text-ellipsis xxs:w-full">
                  Sony WH-1000XM
                </CardTitle>
                <CardDescription className="xxs:text-xs md:text-sm leading-none xxs:text-nowrap xxs:overflow-hidden xxs:text-ellipsis xxs:w-full whitespace-nowrap">
                  YOUR WORLD. NOTHING ELSE.
                </CardDescription>
              </CardHeader>
              <CardFooter className="absolute bottom-0 right-0 md:p-6 xxs:p-3">
                <Link
                  to={
                    "/products/c1b8bc76-7b7d-6961-287e-d77a6ffa4984/c0c0c0/30mm"
                  }>
                  <Button
                    variant="secondary"
                    className="md:text-sm md:py-2 md:px-4 xxs:text-xs xxs:py-2 xxs:px-2 xxs:h-fit md:h-10">
                    Buy Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            className="flex col-span-2 backdrop-blur-3xl rounded-lg md:h-auto xxs:h-32"
            initial={{ opacity: 0, scale: 1, translateY: 50 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: easeInOut,
            }}>
            <Card className="border-muted   w-full  bg-transparent  bg-[url(https://res.cloudinary.com/dbgwe94vv/image/upload/v1715988653/ASUS-Zephyrus1_m82tyq.webp)] bg-contain bg-no-repeat bg-center relative md:h-1/2 xxs:h-32">
              <CardHeader className="md:p-6 xxs:p-3">
                <CardTitle className="xxs:text-base md:text-2xl leading-none">
                  ASUS Zephyrus
                </CardTitle>
                <CardDescription className="xxs:text-xs md:text-sm leading-none   xxs:w-full whitespace-nowrap">
                  For Those Who Dare!
                </CardDescription>
              </CardHeader>
              <CardFooter className="absolute bottom-0 right-0 md:p-6 xxs:p-3">
                <Link
                  to={
                    "/products/62dd7b31-9a01-c054-2190-b624af386cc8/3f3939/1TB"
                  }>
                  <Button
                    variant="secondary"
                    className="md:text-sm md:py-2 md:px-4 xxs:text-xs xxs:py-2 xxs:px-2 xxs:h-fit md:h-10">
                    Buy Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
