import React, { useCallback, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { FiUsers } from "react-icons/fi";
import { Input } from "@/shared/components/ui/input";
import { debounce } from "@/shared/utils/debounce";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import PassengerItem from "../PassengerItem";
import AddPassenger from "../AddPassenger";

function PassengersAccordion() {
  const [searchValue, setSearchValue] = useState("");
  const { proposal } = useSteppers();

  const passengers = proposal?.passengers ?? [];

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
              <PassengerItem key={passenger.id} passenger={passenger} proposal={proposal!} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default PassengersAccordion;
