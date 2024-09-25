import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

// import { useConfirm } from "@/hooks/use-confirm";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  return (
    <>
      {/* <ConfirmDialog /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
          // onClick={() => onOpen(id)}
          // disabled={deleteMutation.isPending}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
          // onClick={handleDelete}
          // disabled={deleteMutation.isPending}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
