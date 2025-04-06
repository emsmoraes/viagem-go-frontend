import { Insurance } from "@/shared/models/insurance.model";
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
import { useDeleteInsuranceMutation } from "../../hooks/useInsurance";
import EditInsuranceForm from "../EditInsuranceForm";

function InsuranceItem({ insurance }: { insurance: Insurance }) {
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { deleteInsurance, isLoadingDeleteInsurance } = useDeleteInsuranceMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Seguro removido com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao remover seguro.");
    },
  });

  const handleDelete = () => {
    if (!proposal) return;
    deleteInsurance({ proposalId: proposal.id, insuranceId: insurance.id });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger className="flex justify-between">
          <div className="flex-1">
            <span className="flex items-center gap-5 text-lg font-medium capitalize">
              {insurance.title}
              {insurance.price && Number(insurance.price) > 0 && (
                <span className="text-sm text-gray-500">– R$ {Number(insurance.price).toFixed(2)}</span>
              )}
            </span>

            {insurance.description && <span className="mt-1 block text-sm text-gray-600">{insurance.description}</span>}

            <div className="mt-2 space-y-1 text-xs text-gray-400">
              <p>Criado em: {moment(insurance.createdAt).format("DD/MM/YYYY HH:mm")}</p>
              <p>Atualizado em: {moment(insurance.updatedAt).format("DD/MM/YYYY HH:mm")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon">
              <FiEdit2 />
            </Button>
            <Button
              disabled={isLoadingDeleteInsurance}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              size="icon"
              variant="destructive"
            >
              {isLoadingDeleteInsurance ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
            </Button>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <Separator className="my-6" />
          <EditInsuranceForm
            insuranceId={insurance.id}
            defaultValues={{
              title: insurance.title,
              description: insurance.description ?? "",
              files: insurance.files,
              images: insurance.images,
              price: Number(insurance.price) ?? 0,
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default InsuranceItem;
