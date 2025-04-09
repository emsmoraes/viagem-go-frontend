import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useDeleteSummaryMutation } from "../../hooks/useSummary";
import EditSummaryForm from "../EditSummaryForm";
import { Summary } from "@/shared/models/summary";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";

function SummaryItem({ summary }: { summary: Summary }) {
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { deleteSummary, isLoadingDeleteSummary } = useDeleteSummaryMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Resumo removido com sucesso.");
    },
    onError: () => {
      toast("Erro ao remover o resumo.");
    },
  });

  const handleDelete = () => {
    if (!proposal) return;
    deleteSummary({ summaryId: summary.id, proposalId: proposal.id });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger className="flex justify-between">
          <div className="flex-1">
            <div className="mt-1 text-sm text-zinc-900">
              <p className="line-clamp-2">
                {summary.includedInProposal}
                {summary.totalValue && Number(summary.totalValue) > 0 && (
                  <span className="text-sm text-gray-500"> – R$ {Number(summary.totalValue).toFixed(2)}</span>
                )}
              </p>
            </div>

            <div className="mt-2 space-y-1 text-xs text-gray-400">
              <p>Criado em: {moment(summary.createdAt).format("DD/MM/YYYY HH:mm")}</p>
              <p>Atualizado em: {moment(summary.updatedAt).format("DD/MM/YYYY HH:mm")}</p>
            </div>
          </div>

          <div className="ml-4 flex items-center gap-2">
            <Button size="icon">
              <FiEdit2 />
            </Button>
            <Button
              disabled={isLoadingDeleteSummary}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              size="icon"
              variant="destructive"
            >
              {isLoadingDeleteSummary ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
            </Button>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <Separator className="my-6" />
          <EditSummaryForm
            summaryId={summary.id}
            defaultValues={{
              includedInProposal: summary.includedInProposal,
              totalValue: Number(summary.totalValue) ?? 0,
              conditionsAndValidity: summary.conditionsAndValidity ?? "",
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SummaryItem;
