import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEditAccount } from "../hooks-api/use-edit-account";
import { useGetAccount } from "../hooks-api/use-get-account";
import { useOpenAccountState } from "../hooks-state/use-open-account-state";
import { AccountForm } from "./account-form";
import { Loader2 } from "lucide-react";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";

const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccountState();
  const accountQuery = useGetAccount(id!);
  const mutation = useEditAccount(id);

  const defaultValues = accountQuery.data
    ? { name: accountQuery.data.name }
    : { name: "" };

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit Account.</SheetDescription>
        </SheetHeader>
        {accountQuery.isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
