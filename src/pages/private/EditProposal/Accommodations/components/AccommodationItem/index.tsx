import { Accommodation } from "@/shared/models/accommodation.model";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { Ticket } from "@/shared/models/ticket.model";
import moment from "moment";
import { useForm } from "react-hook-form";
import { MdFlight } from "react-icons/md";
import { Button } from "@/shared/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { Separator } from "@/shared/components/ui/separator";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useDeleteAccommodationMutation } from "../../hooks/useAccomodations";
import EditAccommodationForm from "../EditAccommodationForm";

interface AccommodationItemProps {
  accommodation: Accommodation;
}

function AccommodationItem({ accommodation }: AccommodationItemProps) {
  console.log(accommodation);
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { deleteAccommodation, isLoadingDeleteAccommodation } = useDeleteAccommodationMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Hospedagem excluída com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao excluir hospedagem");
    },
  });

  const handleDelete = () => {
    if (!proposal) return;
    deleteAccommodation({ proposalId: proposal.id, accommodationId: accommodation.id });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger className="flex justify-between">
          <div className="flex-1">
            <span className="flex items-center gap-5 text-lg font-medium">
              {accommodation.name} {accommodation.location && `- ${accommodation.location}`}
            </span>

            {(accommodation.checkIn || accommodation.checkOut) && (
              <span className="mt-3 mb-1 flex items-center gap-3 text-sm text-gray-600">
                {accommodation.checkIn && `Check-in: ${moment(accommodation.checkIn).format("DD/MM/YYYY")}`}
                {accommodation.checkIn && accommodation.checkOut && " - "}
                {accommodation.checkOut && `Check-out: ${moment(accommodation.checkOut).format("DD/MM/YYYY")}`}
              </span>
            )}

            {accommodation.category && (
              <span className="text-sm text-gray-600">Categoria: {accommodation.category}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button size={"icon"}>
              <FiEdit2 />
            </Button>
            <Button
              disabled={isLoadingDeleteAccommodation}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              size={"icon"}
              variant={"destructive"}
            >
              {isLoadingDeleteAccommodation ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
            </Button>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <Separator className="my-6" />
          <EditAccommodationForm
            accommodationId={accommodation.id}
            defaultValues={{
              name: accommodation.name || "",
              location: accommodation.location || "",
              address: accommodation.address || "",
              checkIn: accommodation.checkIn || "",
              checkOut: accommodation.checkOut || "",
              category: accommodation.category || "",
              boardType: accommodation.boardType || "",
              roomType: accommodation.roomType || "",
              description: accommodation.description || "",
              price: Number(accommodation.price) ?? undefined,
              images: accommodation.images,
              files: accommodation.files,
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AccommodationItem;
