import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/shared/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { useDeleteCustomerMutation } from "../../hooks/useCustomer";
import { toast } from "sonner";

interface DeleteCostumerProps {
  customerId: string;
}

function DeleteCostumer({ customerId }: DeleteCostumerProps) {
  const { mutate: deleteCustomer, isPending } = useDeleteCustomerMutation({
    onSuccess: () => {
      toast("Proposta excluída com sucesso!");
    },
    onError: () => {
      toast("Erro ao excluir a proposta:");
    },
  });

  const handleDelete = () => {
    deleteCustomer(customerId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="aspect-square h-full rounded-full bg-red-100 px-3 text-red-800">
          <RiDeleteBinLine size={21} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar cliente</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir o cliente? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline"> Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="[&_svg:not([class*='size-'])]:size-6"
          >
            {isPending ? <CgSpinner className="animate-spin" /> : "Deletar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCostumer;
