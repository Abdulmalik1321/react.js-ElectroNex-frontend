import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";

export function Hero() {
  return (
    <section className="mt-5 w-[100%]">
      <div className="w-[100%] h-[50dvh] grid grid-cols-12 gap-5">
        <Card className="row-span-3 col-span-6 bg-[url(./src/assets/imgs/iphone15-pro1.webp)] [background-position-y:100px] bg-contain bg-no-repeat bg-center relative">
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

        <Card className="row-span-2 col-span-6 bg-[url(./src/assets/imgs/ASUS-Zephyrus1.webp)] bg-contain bg-no-repeat bg-center relative">
          <CardHeader>
            <CardTitle>ASUS Zephyrus</CardTitle>
            <CardDescription>For Those Who Dare!</CardDescription>
          </CardHeader>
          <CardFooter className="absolute bottom-0 right-0">
            <Button>Buy Now</Button>
          </CardFooter>
        </Card>

        <Card className="col-span-3 relative">
          <CardHeader>
            <CardTitle>
              Electronics<strong>Hub</strong>
            </CardTitle>
            <CardDescription>
              Save money and upgrade your tech today
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Explore our online store for top-quality electronics. */}
            Dive into our wide range of electronics to find the perfect device.
          </CardContent>

          <CardFooter className="absolute bottom-0 right-0">
            <Button
              className=" border border-[hsl(var(--primary))]"
              variant="ghost">
              Start shopping now!
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-3 relative">
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
        </Card>
      </div>
      <h1 className="scroll-m-20 pb-2 text-3xl font-normal mt-5">
        Where Quality Meets Sustainability – From the latest{" "}
        <strong>Smartphones</strong> 📱 to high-performance{" "}
        <strong>Laptops</strong> 💻. We offer a wide range of brand new products
        as well as quality-assured used products to fit every budget.
      </h1>
    </section>
  );
}
