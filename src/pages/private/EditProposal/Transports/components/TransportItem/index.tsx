import { Transport } from "@/shared/models/transport.model";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useDeleteTransportMutation } from "../../hooks/useTransport";
import EditTransportForm from "../EditTransportForm";

function TransportItem({ transport }: { transport: Transport }) {
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { deleteTransport, isLoadingDeleteTransport } = useDeleteTransportMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Transporte excluído com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao excluir transporte.");
    },
  });

  const handleDelete = () => {
    if (!proposal) return;
    deleteTransport({ proposalId: proposal.id, transportId: transport.id });
  };
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger className="flex justify-between">
          <div className="flex-1">
            <span className="flex items-center gap-5 text-lg font-medium capitalize">
              {transport.type}
              {transport.price && Number(transport.price) > 0 && (
                <span className="text-sm text-gray-500">– R$ {Number(transport.price).toFixed(2)}</span>
              )}
            </span>

            {transport.description && <span className="mt-1 block text-sm text-gray-600">{transport.description}</span>}

            <div className="mt-2 space-y-1 text-xs text-gray-400">
              <p>Criado em: {moment(transport.createdAt).format("DD/MM/YYYY HH:mm")}</p>
              <p>Atualizado em: {moment(transport.updatedAt).format("DD/MM/YYYY HH:mm")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon">
              <FiEdit2 />
            </Button>
            <Button
              disabled={isLoadingDeleteTransport}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              size="icon"
              variant="destructive"
            >
              {isLoadingDeleteTransport ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
            </Button>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <Separator className="my-6" />
          <EditTransportForm defaultValues={{
          type: transport.type,
          description: transport.description,
          files: transport.files,
          images: transport.images,
          price: Number(transport.price) ?? 0,
          }} transportId={transport.id}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default TransportItem;
