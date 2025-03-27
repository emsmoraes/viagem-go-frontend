import React, { useCallback, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { FiUsers } from "react-icons/fi";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import AddPassenger from "../AddPassenger";
import { useSteppers } from "../../contexts/SteppersContext/useSteppers";
import { friendlyDate } from "@/shared/utils/friendlyDate";
import { Button } from "@/shared/components/ui/button";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "sonner";
import { useDeletePassengerMutation } from "../../Passengers/hooks/usePassengers";
import { CgSpinner } from "react-icons/cg";
import { useQueryClient } from "@tanstack/react-query";
import { debounce } from "@/shared/utils/debounce";

function PassengersAccordion() {
  const [searchValue, setSearchValue] = useState("");
  const { proposal } = useSteppers();
  const queryClient = useQueryClient();

  const passengers = proposal?.passengers ?? [];

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

  const onInput = (searchValue: string): void => {
    setSearchValue(searchValue);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onInputWithDebouncing = useCallback(debounce(onInput, 1000), []);

  const filteredPassengers = passengers.filter((passenger) =>
    passenger.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <FiUsers size={24} className="text-primary" /> <h2 className="text-lg font-[400]">Passageiros</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <h2 className="text-base">Adicione passageiros á proposta</h2>

          <div className="my-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <Input
              onChange={(e) => onInputWithDebouncing(e.target.value)}
              className="w-full md:max-w-[500px]"
              placeholder="Buscar usuário"
            />
            <AddPassenger />
          </div>

          <div className="space-y-3">
            {filteredPassengers.map((passenger) => (
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
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default PassengersAccordion;
