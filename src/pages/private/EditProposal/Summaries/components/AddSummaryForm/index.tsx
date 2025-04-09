import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useCreateSummaryMutation } from "../../hooks/useSummary";
import MoneyInput from "@/shared/components/Form/MoneyInput";

const addSummaryFormSchema = z.object({
  includedInProposal: z.string().min(1, { message: "Campo obrigatório" }),
  totalValue: z.coerce.number().min(0, "Informe um valor válido"),
  conditionsAndValidity: z.string().min(1, { message: "Campo obrigatório" }),
});

export type SummarySchema = z.infer<typeof addSummaryFormSchema>;

function AddSummaryForm({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { createSummary, isLoadingCreateSummary } = useCreateSummaryMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      form.reset();
      setOpen(false);
      toast("Resumo criado com sucesso!");
    },
    onError: () => {
      toast("Erro ao criar resumo.");
    },
  });

  const form = useForm<SummarySchema>({
    resolver: zodResolver(addSummaryFormSchema),
    defaultValues: {
      includedInProposal: "",
      totalValue: 0,
      conditionsAndValidity: "",
    },
  });

  const onSubmit = (values: SummarySchema) => {
    if (!proposal) return;

    createSummary({
      ...values,
      proposalId: proposal.id,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="includedInProposal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Incluir na proposta</FormLabel>
              <FormControl>
                <Textarea placeholder="Conteúdo a ser incluído na proposta" {...field} />
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
                <Textarea placeholder="Descreva as condições e validade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoadingCreateSummary} className="flex-1 [&_svg]:size-6">
          {isLoadingCreateSummary ? <CgSpinner className="animate-spin" /> : "Salvar"}
        </Button>
      </form>
    </Form>
  );
}

export default AddSummaryForm;
