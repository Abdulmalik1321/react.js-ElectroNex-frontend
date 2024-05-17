import { Button } from "@/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog";

import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
export function CustomDialog({
  openButton,
  openButtonVariant,
  submitButton,
  submitButtonVariant,
  ChangeHandler,
  submitHandler,
}: {
  openButton: any;
  openButtonVariant: any;
  submitButton: any;
  submitButtonVariant: any;
  ChangeHandler: any;
  submitHandler: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={openButtonVariant} className="gap-1">
          {openButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Wishlist</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start gap-3 mt-5">
          <Label htmlFor="name" className="text-right">
            WishList Name:
          </Label>
          <Input onChange={ChangeHandler} id="name" />
        </div>
        <DialogFooter>
          <Button
            variant={submitButtonVariant}
            type="submit"
            className="gap-1"
            onClick={() => {
              submitHandler();
            }}>
            {submitButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
