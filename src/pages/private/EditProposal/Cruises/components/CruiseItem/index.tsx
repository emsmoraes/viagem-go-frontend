import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import moment from "moment";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useDeleteCruiseMutation } from "../../hooks/useCruises";
import EditCruiseForm from "../EditCruiseForm";
import { Cruise } from "@/shared/models/cruise.model";

interface CruiseItemProps {
  cruise: Cruise;
}

function CruiseItem({ cruise }: CruiseItemProps) {
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { deleteCruise, isLoadingDeleteCruise } = useDeleteCruiseMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Cruzeiro excluído com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao excluir cruzeiro");
    },
  });

  const handleDelete = () => {
    if (!proposal) return;
    deleteCruise({ proposalId: proposal.id, cruiseId: cruise.id });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger className="flex justify-between">
          <div className="flex-1">
            <span className="flex items-center gap-5 text-lg font-medium">
              {cruise.name} {cruise.cabin && `- Cabine: ${cruise.cabin}`}
            </span>

            {(cruise.checkIn || cruise.checkOut) && (
              <span className="mt-3 mb-1 flex items-center gap-3 text-sm text-gray-600">
                {cruise.checkIn && `Embarque: ${moment(cruise.checkIn).format("DD/MM/YYYY")}`}
                {cruise.checkIn && cruise.checkOut && " - "}
                {cruise.checkOut && `Retorno: ${moment(cruise.checkOut).format("DD/MM/YYYY")}`}
              </span>
            )}

            {cruise.route && <span className="text-sm text-gray-600">Roteiro: {cruise.route}</span>}
          </div>

          <div className="flex items-center gap-2">
            <Button size={"icon"}>
              <FiEdit2 />
            </Button>
            <Button
              disabled={isLoadingDeleteCruise}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              size={"icon"}
              variant={"destructive"}
            >
              {isLoadingDeleteCruise ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
            </Button>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <Separator className="my-6" />
          <EditCruiseForm
            cruiseId={cruise.id}
            defaultValues={{
              name: cruise.name,
              cabin: cruise.cabin,
              checkIn: cruise.checkIn,
              checkOut: cruise.checkOut,
              description: cruise.description,
              files: cruise.files,
              images: cruise.images,
              paymentMethods: cruise.paymentMethods,
              route: cruise.route,
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default CruiseItem;
