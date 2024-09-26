"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ResponseType, columns } from "@/app/(dashboard)/accounts/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useNewAccountState } from "@/features/accounts/hooks-state/use-new-account-state";

function getData(): ResponseType[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "m@example.com",
    },
    {
      id: "489e1d42",
      name: "example@gmail.com",
    },
    // ...
  ];
}

const AccountsPage = () => {
  const data = getData();
  const { isOpen, open, close } = useNewAccountState();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Accounts Page</CardTitle>
          <Button onClick={open}>Add new Account</Button>
        </CardHeader>
        <CardContent>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
