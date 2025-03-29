import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { FiMapPin } from "react-icons/fi";
import AddDestination from "../AddDestination";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import DestinationItem from "../DestinationItem";

function DestinationsAccordion() {
  const { proposal } = useSteppers();

  const destinations = proposal?.destinations ?? [];

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <FiMapPin size={24} className="text-primary" /> <h2 className="text-lg font-[400]">Destinos</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <h2 className="text-base">Adicione destinos á proposta</h2>

          <div className="my-6">
            <AddDestination />
          </div>

          <div className="space-y-3">
            {destinations.map((destination, index) => (
              <>
                <DestinationItem destination={destination} proposal={proposal!} index={index} />
                {index !== destinations.length - 1 && destinations.length > 1 && (
                  <div className="ml-5 h-10 w-px border-l-2 border-dotted border-gray-400" />
                )}
              </>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default DestinationsAccordion;
