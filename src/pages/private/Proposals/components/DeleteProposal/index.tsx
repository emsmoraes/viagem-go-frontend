import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import { useDeleteProposalMutation } from "../../hooks/useProposal";
import { DialogClose } from "@radix-ui/react-dialog";

interface DeleteProposalProps {
  proposalId: string;
}

function DeleteProposal({ proposalId }: DeleteProposalProps) {
  const { mutate: deleteProposal, isPending } = useDeleteProposalMutation({
    onSuccess: () => {
      toast("Proposta excluída com sucesso!");
    },
    onError: () => {
      toast("Erro ao excluir a proposta:");
    },
  });

  const handleDelete = () => {
    deleteProposal(proposalId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-full rounded-full bg-red-100 px-3 text-red-800">
          <RiDeleteBinLine size={21} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar Proposta</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir a proposta? Esta ação não pode ser desfeita.
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

export default DeleteProposal;
