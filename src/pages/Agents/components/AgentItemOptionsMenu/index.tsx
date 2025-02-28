import { Button } from "@/shared/components/ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { MdDelete, MdEdit } from "react-icons/md";

function AgentItemOptionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="bg-transparent hover:bg-zinc-100 hover:text-zinc-600 rounded-full"
        >
          <EllipsisVerticalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="group">
          <MdEdit className="w-4 h-4 group-hover:text-default-foreground" /> Editar
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <MdDelete className="w-4 h-4 group-hover:text-default-foreground" /> Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AgentItemOptionsMenu;
