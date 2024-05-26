import { Ratings } from "@/shadcn/ui/rating";
import { Separator } from "@/shadcn/ui/separator";
import { Progress } from "@/shadcn/ui/progress";
import { ChevronDown, CornerDownLeft, Paperclip } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";

import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";
import { Textarea } from "@/shadcn/ui/textarea";
import { Card } from "@/shadcn/ui/card";

export function Review() {
  return (
    <section className="mt-52 w-full">
      <div className="w-full flex justify-center items-center gap-5 mt-12">
        <div className="flex flex-col justify-center items-center gap-3 w-fit">
          <p className="text-6xl">4.5</p>
          <Ratings variant="yellow" rating={4.5} />
          <p className="text-muted-foreground">35K Ratings</p>
        </div>
        <Separator className="h-32" orientation="vertical" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Progress value={70} className="w-[40vw] h-3" />
            <p>5.0</p>
            <p className="text-muted-foreground">17.5K Ratings</p>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={35} className="w-[40vw] h-3" />
            <p>4.0</p>
            <p className="text-muted-foreground">5.25K Ratings</p>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={50} className="w-[40vw] h-3" />
            <p>3.0</p>
            <p className="text-muted-foreground">7K Ratings</p>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={25} className="w-[40vw] h-3" />
            <p>2.0</p>
            <p className="text-muted-foreground">1.75K Ratings</p>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={30} className="w-[40vw] h-3" />
            <p>1.0</p>
            <p className="text-muted-foreground">350 Ratings</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-12 flex justify-center">
        <div className=" w-[75%]">
          <div className="mt-12">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Abdullah</p>
                <p className="text-sm text-muted-foreground">2 weeks ago</p>
              </div>
              <div className="ml-auto font-medium flex items-center gap-3">
                <p>
                  <strong>5</strong>
                </p>
                <Ratings variant="yellow" rating={5} />
              </div>
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
              aspernatur, sunt illo magni error ab facilis exercitationem ea
              culpa nemo rerum non ratione enim asperiores quia sit nostrum
              sapiente obcaecati!
            </p>
            <div>
              <Card className="size-10" />
            </div>
            <Separator className="mt-6" />
          </div>

          <div className="mt-12">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>YZ</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Yazan</p>
                <p className="text-sm text-muted-foreground">2 months ago</p>
              </div>
              <div className="ml-auto font-medium flex items-center gap-3">
                <p>
                  <strong>2.5</strong>
                </p>
                <Ratings variant="yellow" rating={2.5} />
              </div>
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
              aspernatur, sunt illo magni error ab facilis exercitationem ea
              culpa nemo rerum non ratione enim asperiores quia sit nostrum
              sapiente obcaecati!
            </p>
            s
            <Separator className="mt-6" />
          </div>

          <div className="mt-12">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>KH</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Khalid</p>
                <p className="text-sm text-muted-foreground">1 months ago</p>
              </div>
              <div className="ml-auto font-medium flex items-center gap-3">
                <p>
                  <strong>3.5</strong>
                </p>
                <Ratings variant="yellow" rating={3.5} />
              </div>
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
              aspernatur, sunt illo magni error ab facilis exercitationem ea
              culpa nemo rerum non ratione enim asperiores quia sit nostrum
              sapiente obcaecati!
            </p>
            <Separator className="mt-6" />
          </div>
          <Button variant="link" className="text-current">
            Read More <ChevronDown />
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-center mt-12">
        <form className="w-[75%] relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
            </Button>

            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Leave a Review
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
