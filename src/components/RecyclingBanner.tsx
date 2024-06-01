import { Button } from "@/shadcn/ui/button";
import { Card } from "@/shadcn/ui/card";

export function RecyclingBanner() {
  return (
    <section className="w-full flex justify-center items-center flex-col">
      <Card className="xxs:w-[95%] md:w-full flex relative overflow-hidden xxs:h-80 md:h-96 bg-primary md:rounded-3xl">
        <div className="xxs:w-[90%] md:w-[50%] xxs:m-8 md:m-16">
          <p className="md:text-4xl invert">
            Don’t let your old devices gather dust - Give them a new life by
            selling them to someone in need. By recycling, you’re contributing
            to a more sustainable future.
          </p>
          <div className="flex xxs:mt-4 md:mt-10">
            <Button className="md:text-2xl md:h-auto bg-secondary text-primary hover:bg-accent">
              Start Selling Now!
            </Button>
            <Button
              className="md:text-2xl md:h-auto border border-secondary ml-6 bg-primary dark:bg-[hsl( 0 0% 100%)] text-white dark:text-secondary hover:!text-primary"
              variant="outline">
              Learn More
            </Button>
          </div>
        </div>
        <img
          className="md:w-[40%] absolute xxs:top-[65%] xxs:-right-1 md:right-12 md:top-12"
          src="https://res.cloudinary.com/dbgwe94vv/image/upload/v1715676217/electronicsHub/crnds0bfjgiwbk266rfd.png"
          alt=""
        />
      </Card>
    </section>
  );
}
