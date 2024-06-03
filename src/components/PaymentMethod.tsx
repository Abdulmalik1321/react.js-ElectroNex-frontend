import { Icons } from "@/shadcn/icons";
import { Button } from "@/shadcn/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { LoadingButton } from "@/shadcn/ui/loadingbutton";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { useState } from "react";

export function PaymentMethod({
  handlePayment,
  loading,
}: {
  handlePayment: any;
  loading: boolean;
}) {
  const [selected, setSelected] = useState("Card");
  return (
    <div className="xxs:col-span-1 md:col-span-4 md:row-span-8">
      <Card className={`rounded-2xl ${selected === "Card" ? "h-full" : ""}`}>
        <CardHeader>
          <CardTitle className="text-3xl">Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup
            onValueChange={(value) => {
              setSelected(value);
            }}
            defaultValue="Card"
            className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem
                value="Card"
                id="Card"
                className="peer sr-only"
                aria-label="Card"
              />
              <Label
                htmlFor="Card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:!bg-transparent hover:border-primary">
                <Icons.card className="mb-3 h-6 w-6" />
                {/* Card */}
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="Tabby"
                id="Tabby"
                className="peer sr-only"
                aria-label="Tabby"
              />
              <Label
                htmlFor="Tabby"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:!bg-transparent hover:border-primary">
                <Icons.tabby className="mb-3 h-6 w-6" />
                {/* Tabby */}
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="Tamara"
                id="Tamara"
                className="peer sr-only"
                aria-label="Tamara"
              />
              <Label
                htmlFor="Tamara"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:!bg-transparent hover:border-primary">
                <Icons.tamara className="mb-3 h-6 w-6" />
                {/* Tamara */}
              </Label>
            </div>
          </RadioGroup>
          {selected === "Card" ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="First Last" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Card number</Label>
                <Input id="number" placeholder="" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="month">Expires</Label>
                  <Select>
                    <SelectTrigger id="month" aria-label="Month">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Select>
                    <SelectTrigger id="year" aria-label="Year">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem
                          key={i}
                          value={`${new Date().getFullYear() + i}`}>
                          {new Date().getFullYear() + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="CVC" />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </CardContent>
        <CardFooter>
          <LoadingButton
            loading={loading}
            onClick={handlePayment}
            className="w-full">
            Checkout with {selected}
          </LoadingButton>
        </CardFooter>
      </Card>
    </div>
  );
}
