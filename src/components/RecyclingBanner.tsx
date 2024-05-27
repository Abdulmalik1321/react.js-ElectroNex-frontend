import { Button } from "@/shadcn/ui/button";
import { Card } from "@/shadcn/ui/card";

export function RecyclingBanner() {
  return (
    <section className="w-full flex justify-center items-center flex-col">
      <Card className="w-full flex relative overflow-hidden h-96 bg-primary rounded-3xl">
        <div className=" w-[50%] m-16">
          <p className="text-4xl invert">
            Don’t let your old devices gather dust - Give them a new life by
            selling them to someone in need. By recycling, you’re contributing
            to a more sustainable future.
          </p>
          <div className="flex mt-10">
            <Button className="text-2xl h-auto bg-secondary text-primary hover:bg-accent">
              Start Selling Now!
            </Button>
            <Button
              className="text-2xl h-auto  border border-secondary ml-6 bg-primary dark:bg-[hsl( 0 0% 100%)] text-white dark:text-secondary hover:!text-primary"
              variant="outline">
              Learn More
            </Button>
          </div>
        </div>
        <img
          className="w-[40%] absolute right-12 top-12"
          src="https://res.cloudinary.com/dbgwe94vv/image/upload/v1715676217/electronicsHub/crnds0bfjgiwbk266rfd.png"
          alt=""
        />
      </Card>
    </section>
  );
}
