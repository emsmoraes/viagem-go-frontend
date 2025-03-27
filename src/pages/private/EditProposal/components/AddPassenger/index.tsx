import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSteppers } from "../../contexts/SteppersContext/useSteppers";
import { useCreatePassengerMutation } from "../../Passengers/hooks/usePassengers";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

function AddPassenger() {
  const [name, setName] = useState("");
  const { proposal } = useSteppers();
  const queryClient = useQueryClient();

  const { createPassenger, isLoadingCreatePassenger } = useCreatePassengerMutation({
    onSuccess: () => {
      setName("");
      toast("Passageiro criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
    },
    onError: (error: any) => {
      alert(`Erro: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const proposalId = proposal?.id;

    if (!proposalId) {
      return false;
    }

    if (name) {
      createPassenger({ name, proposalId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full md:w-auto">
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="w-full min-w-[230px] pr-13 md:w-auto"
        placeholder="Adicionar passageiro"
      />
      <Button
        type="submit"
        disabled={!name || isLoadingCreatePassenger}
        className="absolute top-1/2 right-2 flex h-fit w-auto -translate-y-1/2 items-center justify-center p-[2px] [&_svg:not([class*='size-'])]:size-6"
        size="icon"
      >
        {isLoadingCreatePassenger ? <CgSpinner className="animate-spin" /> : <IoIosAddCircleOutline size={28} />}
      </Button>
    </form>
  );
}

export default AddPassenger;
