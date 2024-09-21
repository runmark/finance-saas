import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { insertAccountSchema } from "@/db/schema"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

const accountFormSchema = insertAccountSchema.pick({ name: true, });
type accountFormValues = z.infer<typeof accountFormSchema>;

type Props = {
    id?: string;
    defaultValues?: accountFormValues;
    onSubmit: (values: accountFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

export const AccountForm = ({
    id, defaultValues, onSubmit, onDelete, disabled
}: Props) => {

    const form = useForm<accountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: defaultValues || { name: "" },
    })

    // const handleSubmit = (values: accountFormValues) => {
    //     onSubmit(values);
    // }

    const handleDelete = () => {
        onDelete?.();
    }
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 pt-4"
            >
                <FormField name="name" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Account Name</FormLabel>
                        <FormControl>
                            <Input
                                disabled={disabled}
                                placeholder="e.g. Cash, Bank, Credit Card, etc."
                                {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                
                <Button className="w-full" disabled={disabled}>{id ? "Save Changes" : "Create Account"}</Button>

                {id && (
                    <Button variant="outline" size="icon" className="w-full" onClick={handleDelete} disabled={disabled} >
                        <Trash className="size-4 mr-2" />
                        Delete Account
                    </Button>
                )}
            </form>
        </Form>
    )
}