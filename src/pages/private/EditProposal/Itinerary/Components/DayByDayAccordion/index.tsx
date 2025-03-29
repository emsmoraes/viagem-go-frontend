import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { LuFootprints } from "react-icons/lu";
import AddDayByDay from "../AddDayByDay";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import DayByDayItem from "../DayByDayItem";

function DayByDayAccordion() {
  const { proposal } = useSteppers();

  const dayByDays = proposal?.dayByDays ?? [];

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <LuFootprints size={24} className="text-primary" /> <h2 className="text-lg font-[400]">Day by day</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <h2 className="text-base">Adicione day by day's á proposta</h2>

          <div className="my-6">
            <AddDayByDay />
          </div>

          <div className="space-y-3">
            {dayByDays.map((dayByDay, index) => (
              <>
                <DayByDayItem dayByDay={dayByDay} proposal={proposal!} index={index} />
                {index !== dayByDays.length - 1 && dayByDays.length > 1 && (
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

export default DayByDayAccordion;
