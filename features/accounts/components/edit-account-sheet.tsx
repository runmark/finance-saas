import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEditAccount } from "../hooks-api/use-edit-account";
import { useOpenAccountState } from "../hooks-state/use-open-account-state";
import { AccountForm } from "./account-form";
import { useGetAccount } from "../hooks-api/use-get-account";

export const EditAccountSheet = () => {
  const { isOpen, open, close, id } = useOpenAccountState();
  const mutation = useEditAccount(id);

  const handleSubmit = (values: any) => {
    mutation.mutate(values, {
      onSuccess: () => {
        close();
      },
    });
  };

  const accountQuery = useGetAccount(id!);

  const defaultValues = accountQuery.data
    ? { name: accountQuery.data.name }
    : { name: "" };

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit Account.</SheetDescription>
        </SheetHeader>
        <AccountForm
          id={id}
          onSubmit={handleSubmit}
          disabled={mutation.isPending}
          defaultValues={defaultValues}
        />
      </SheetContent>
    </Sheet>
  );
};
