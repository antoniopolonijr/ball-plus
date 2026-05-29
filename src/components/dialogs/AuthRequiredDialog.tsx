import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthRequiredDialog({
  open,
  onOpenChange,
}: AuthRequiredDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account required</DialogTitle>

          <DialogDescription>
            Create an account to save groups, players and match history.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/sign-in">Sign In</Link>
          </Button>

          <Button asChild className="flex-1">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
