import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { Ticket } from "@/shared/models/ticket.model";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useForm } from "react-hook-form";
import { MdFlight } from "react-icons/md";
import { PiFiles, PiImages } from "react-icons/pi";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import MultipleImageUpload from "@/shared/components/MultipleImageUpload";
import ImagePreview from "@/shared/components/ImagePreview";
import FilePreview from "@/shared/components/FilePreview";
import MoneyInput from "@/shared/components/Form/MoneyInput";
import { DatePickerInput } from "@/shared/components/Form/DatePickerInput";
import { Textarea } from "@/shared/components/ui/textarea";
import { CgSpinner } from "react-icons/cg";
import { Separator } from "@/shared/components/ui/separator";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useDeleteFlightMutation } from "../../hooks/useFlights";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import EditFlightForm, { FlightSchema } from "../EditFlightForm";

interface FlightItemProps {
  flight: Ticket;
  defaultValues: FlightSchema;
}

function FlightItem({ flight, defaultValues }: FlightItemProps) {
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { deleteFlight, isLoadingDeleteFlight } = useDeleteFlightMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Destino excluído com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao excluir destino");
    },
  });

  const handleDelete = () => {
    if (!proposal) return;
    deleteFlight({ proposalId: proposal.id, ticketId: flight.id });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger className="flex justify-between">
          <div className="flex-1">
            <span className="flex items-center gap-5 text-lg font-medium">
              {flight.origin} <MdFlight size={22} className="text-primary rotate-90" /> {flight.destination}
            </span>

            {flight.departureAt && (
              <span className="mt-3 mb-1 flex items-center gap-3 text-sm text-gray-600">
                Em: {moment(flight.departureAt).format("DD/MM/YYYY")} -{" "}
                {moment(flight.arrivalAt).format("DD/MM/YYYY")}
              </span>
            )}
            {flight.duration && <span className="text-sm text-gray-600">Duração: {flight.duration} hrs</span>}
          </div>
          <div className="flex items-center gap-2">
            <Button size={"icon"}>
              <FiEdit2 />
            </Button>
            <Button
              disabled={isLoadingDeleteFlight}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              size={"icon"}
              variant={"destructive"}
            >
              {isLoadingDeleteFlight ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
            </Button>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Separator className="my-6" />
          <EditFlightForm defaultValues={defaultValues} ticketId={flight.id}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default FlightItem;
