import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNewAccountState } from "../zustand-hooks/use-new-account-state";
import { AccountForm } from "./account-form";

export const NewAccountSheet = () => {
    
    const { isOpen, close } = useNewAccountState();

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
                    onSubmit={() => {}}
                    defaultValues={{
                        name: "hello default",
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}