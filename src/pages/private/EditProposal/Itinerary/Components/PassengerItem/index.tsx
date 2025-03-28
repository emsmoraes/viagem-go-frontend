import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Passenger } from "@/shared/models/passenger.model";
import React from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Proposal } from "@/shared/models/proposal.model";
import { friendlyDate } from "@/shared/utils/friendlyDate";
import { HiOutlineTrash } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import { useDeletePassengerMutation } from "../../hooks/usePassengers";

function PassengerItem({ passenger, proposal }: { passenger: Passenger; proposal: Proposal }) {
  const queryClient = useQueryClient();

  const { deletePassenger, isLoadingDeletePassenger } = useDeletePassengerMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Passageiro excluído com sucesso");
    },
    onError: () => {
      toast("Erro ao excluir passageiro");
    },
  });

  const handleDelete = (id: string) => {
    const proposalId = proposal?.id;
    if (!proposalId) return;

    deletePassenger({ id, proposalId });
  };

  return (
    <Card key={passenger.id}>
      <CardContent className="relative flex items-center justify-between">
        <div>
          <p>{passenger.name}</p>
          <small className="absolute block text-gray-400/80">{friendlyDate(passenger.createdAt)}</small>
        </div>

        <Button
          disabled={isLoadingDeletePassenger}
          size={"icon"}
          variant={"destructive"}
          onClick={() => handleDelete(passenger.id)}
        >
          {isLoadingDeletePassenger ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
        </Button>
      </CardContent>
    </Card>
  );
}

export default PassengerItem;
