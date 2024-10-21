"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { columns } from "@/app/(dashboard)/accounts/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/hooks-api/use-get-accounts";
import { useNewAccountState } from "@/features/accounts/hooks-state/use-new-account-state";
import { Plus } from "lucide-react";
import { useBulkDeleteAccount } from "@/features/accounts/hooks-api/use-bulk-delete-account";

// function getData(): ResponseType[] {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       name: "m@example.com",
//     },
//     {
//       id: "489e1d42",
//       name: "example@gmail.com",
//     },
//     // ...
//   ];
// }

const AccountsPage = () => {
  const newAccountState = useNewAccountState();

  const bulkDeleteAccounts = useBulkDeleteAccount();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const isDisabled = accountsQuery.isLoading;

  if (accountsQuery.isLoading) {
    return (
      <div>
        <Card>
          <CardHeader></CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
          <Button onClick={newAccountState.open} size="sm">
            <Plus className="size-4 mr-2" />
            Add new Account
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterkey="name"
            columns={columns}
            data={accounts}
            disabled={isDisabled}
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);
              bulkDeleteAccounts.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
