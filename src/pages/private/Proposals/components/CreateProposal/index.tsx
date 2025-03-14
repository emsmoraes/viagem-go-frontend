import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { IoAddCircleOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateProposalMutation } from "../../hooks/useProposal";

const proposalSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres." }),
});

function CreateProposal() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { mutate, isPending } = useCreateProposalMutation({
    onSuccess: () => {
      toast.success("Proposta criada com sucesso!");
      setOpenCreateModal(false);
      form.reset();
    },
    onError: () => {
      toast.error("Erro ao criar a proposta.");
    },
  });

  const form = useForm({
    resolver: zodResolver(proposalSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof proposalSchema>) {
    mutate(values.title);
  }

  return (
    <Dialog onOpenChange={setOpenCreateModal} open={openCreateModal}>
      <DialogTrigger asChild>
        <Button className="h-full px-5 text-[16px] font-[400] [&_svg:not([class*='size-'])]:size-6 max-h-full">
          <IoAddCircleOutline />
          Criar Proposta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-3">
          <DialogTitle>Adicionar nova proposta</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Proposta</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isPending} className="w-full [&_svg:not([class*='size-'])]:size-6">
                {isPending ? <CgSpinner className="animate-spin" /> : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProposal;
