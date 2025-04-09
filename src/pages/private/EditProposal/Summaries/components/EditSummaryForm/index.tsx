import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import MoneyInput from "@/shared/components/Form/MoneyInput";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import { useQueryClient } from "@tanstack/react-query";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useUpdateSummaryMutation } from "../../hooks/useSummary";
import { UpdateSummaryRequest } from "@/shared/services/entities";

const summarySchema = z.object({
  includedInProposal: z.string().min(1, { message: "Campo obrigatório" }),
  totalValue: z.coerce.number().min(0, "Informe um valor válido"),
  conditionsAndValidity: z.string().min(1, { message: "Campo obrigatório" }),
});

export type EditSummarySchema = z.infer<typeof summarySchema>;

type EditSummaryFormProps = {
  defaultValues: EditSummarySchema;
  summaryId: string;
};

function EditSummaryForm({ defaultValues, summaryId }: EditSummaryFormProps) {
  const { proposal } = useSteppers();
  const queryClient = useQueryClient();

  const form = useForm<EditSummarySchema>({
    resolver: zodResolver(summarySchema),
    defaultValues,
  });

  const { updateSummary, isLoadingUpdateSummary } = useUpdateSummaryMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      form.reset(form.watch());
      toast("Resumo atualizado com sucesso!");
    },
    onError: () => {
      toast("Erro ao atualizar resumo");
    },
  });

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  const onSubmit = (values: EditSummarySchema) => {
    if (!proposal || !summaryId) return;

    const data: UpdateSummaryRequest = {
      ...values,
    };

    updateSummary({ summaryId, proposalId: proposal.id, data });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="includedInProposal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Incluso na proposta</FormLabel>
              <FormControl>
                <Textarea placeholder="Itens que estão inclusos na proposta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MoneyInput placeholder="Digite o valor total" form={form} name="totalValue" label="Valor total" />

        <FormField
          control={form.control}
          name="conditionsAndValidity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condições e validade</FormLabel>
              <FormControl>
                <Textarea placeholder="Insira as condições e validade da proposta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex-1 [&_svg:not([class*='size-'])]:size-6"
          disabled={!isFormDirty || isLoadingUpdateSummary}
        >
          {isLoadingUpdateSummary ? <CgSpinner className="animate-spin" /> : "Atualizar"}
        </Button>
      </form>
    </Form>
  );
}

export default EditSummaryForm;
