import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { FiMapPin } from "react-icons/fi";
import AddDestination from "../AddDestination";

function DestinationsAccordion() {
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default DestinationsAccordion;
