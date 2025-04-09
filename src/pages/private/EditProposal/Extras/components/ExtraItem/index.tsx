import { Extra } from "@/shared/models/extra.model";
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
import { useDeleteExtraMutation } from "../../hooks/useExtra";
import EditExtraForm from "../EditExtraForm";

function ExtraItem({ extra }: { extra: Extra }) {
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { deleteExtra, isLoadingDeleteExtra } = useDeleteExtraMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Item adicional removido com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao remover item adicional.");
    },
  });

  const handleDelete = () => {
    if (!proposal) return;
    deleteExtra({ proposalId: proposal.id, extraId: extra.id });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger className="flex justify-between">
          <div className="flex-1">
            <span className="flex items-center gap-5 text-lg font-medium capitalize">
              {extra.title}
              {extra.price && Number(extra.price) > 0 && (
                <span className="text-sm text-gray-500">– R$ {Number(extra.price).toFixed(2)}</span>
              )}
            </span>

            {extra.description && <span className="mt-1 block text-sm text-gray-600">{extra.description}</span>}

            <div className="mt-2 space-y-1 text-xs text-gray-400">
              <p>Criado em: {moment(extra.createdAt).format("DD/MM/YYYY HH:mm")}</p>
              <p>Atualizado em: {moment(extra.updatedAt).format("DD/MM/YYYY HH:mm")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon">
              <FiEdit2 />
            </Button>
            <Button
              disabled={isLoadingDeleteExtra}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              size="icon"
              variant="destructive"
            >
              {isLoadingDeleteExtra ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
            </Button>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <Separator className="my-6" />
          <EditExtraForm
            extraId={extra.id}
            defaultValues={{
              title: extra.title,
              description: extra.description ?? "",
              files: extra.files,
              images: extra.images,
              price: Number(extra.price) ?? 0,
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ExtraItem;
