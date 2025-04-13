import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import MaskedInput from "@/shared/components/Form/MaskedInput";
import { useUpdateAgencyMutation } from "../../hooks/useAgency";
import { QueryClient } from "@tanstack/react-query";

const agencySchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório." }),
  whatsapp: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  website: z.string().trim().url("URL inválida").optional(),
  instagram: z.string().trim(),
  locationLink: z.string().trim().url("URL inválida").optional(),
  description: z.string().trim(),
});

export type AgencySchema = z.infer<typeof agencySchema>;

interface AgencyInfosFormProps {
  defaultValues: AgencySchema;
  queryClient: QueryClient;
  canEdit: boolean;
}

function AgencyInfosForm({ defaultValues, queryClient, canEdit }: AgencyInfosFormProps) {
  const { updateAgency, isLoadingUpdate } = useUpdateAgencyMutation({
    onSuccess: () => {
      toast("Informações da agência atualizadas com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["agency"] });
    },
    onError: () => {
      toast("Erro ao atualizar informações da agência");
    },
  });

  const form = useForm({
    resolver: zodResolver(agencySchema),
    defaultValues,
  });

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  const onSubmit = (data: AgencySchema) => {
    if (canEdit) {
      updateAgency(data);
      form.reset({
        ...data,
      });
    }
  };

  return (
    <div className="flex-1 lg:pr-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!canEdit}
                      className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                      placeholder="Digite o nome da agência"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <MaskedInput
              disabled={!canEdit}
              control={form.control}
              name="whatsapp"
              label="WhatsApp"
              mask="(00) 00000-0000"
              className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
            />
            <MaskedInput
              disabled={!canEdit}
              control={form.control}
              name="phone"
              label="Telefone"
              mask="(00) 00000-0000"
              className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!canEdit}
                      className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                      placeholder="Digite a URL do site"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!canEdit}
                      className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                      placeholder="Digite o @ do Instagram"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationLink"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel>Link de Localização</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!canEdit}
                      className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                      placeholder="Cole o link do Google Maps"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!canEdit}
                      className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                      placeholder="Digite uma breve descrição"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full justify-end">
            <Button
              type="submit"
              className="h-[50px] px-5 text-[16px] font-[400]"
              disabled={!isFormDirty || isLoadingUpdate}
            >
              {isLoadingUpdate ? <CgSpinner className="animate-spin" /> : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AgencyInfosForm;
