import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNewAccountState } from "../zustand-hooks/use-new-account-state";
import { AccountForm } from "./account-form";
import { useCreateAccounts } from "../api-hooks/use-create-accounts";

export const NewAccountSheet = () => {
    
    const { isOpen, close } = useNewAccountState();
    const mutation = useCreateAccounts();

    const handleSubmit = (values: any) => {
        mutation.mutate(values, {
            onSuccess: () => {
                close();
            },
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={close}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    onSubmit={handleSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{
                        name: "",
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}