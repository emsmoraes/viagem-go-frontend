import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useUpdateUserProfileMutation } from "../../hooks/useUserProfile";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import MaskedInput from "@/shared/components/Form/MaskedInput";
import { authStore } from "@/shared/store/auth.store";

const proposalSchema = z.object({
  email: z.string().min(1, { message: "O email é obrigatório." }).email(),
  name: z
    .string()
    .trim()
    .min(1, { message: "O nome é obrigatório." })
    .refine((val) => val.length > 0, { message: "O nome não pode ser vazio." }),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length > 0, { message: "O telefone não pode ser vazio." }),
  proposalThankYouMessageTitle: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length > 0, { message: "O título da mensagem não pode ser vazio." }),
  proposalThankYouMessageSubtitle: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length > 0, { message: "O subtítulo da mensagem não pode ser vazio." }),
});

export type ProposalSchema = z.infer<typeof proposalSchema>;

interface UserProfileInfosFormProps {
  defaultValues: ProposalSchema;
  userId?: string | null;
}

function UserProfileInfosForm({ defaultValues, userId }: UserProfileInfosFormProps) {
  const { updateUserProfile, isLoadingUpdate } = useUpdateUserProfileMutation({
    onSuccess: (updatedUser) => {
      authStore.setState((state) => ({
        ...state,
        user: { ...state.user, ...updatedUser },
      }));

      toast("Perfil atualizado com sucesso!");
    },
    onError: () => {
      toast("Erro ao atualizar perfil");
    },
  });

  const form = useForm({
    resolver: zodResolver(proposalSchema),
    defaultValues,
  });

  const onSubmit = (data: any) => {
    if (!userId) return;

    const { email, ...filteredData } = data;

    updateUserProfile({
      userId: userId,
      data: filteredData,
    });

    form.reset({
      ...data,
    });
  };

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  return (
    <div className="flex-1 lg:pr-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                      disabled
                      placeholder="Digite seu email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                      placeholder="Digite seu nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <MaskedInput
              control={form.control}
              name="phone"
              label="Telefone"
              mask="(00) 00000-0000"
              className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
            />

            <FormField
              control={form.control}
              name="proposalThankYouMessageTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel>Mensagem de Agradecimento - Título</FormLabel>
                  <FormControl>
                    <Input
                      className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                      placeholder="Digite o título da mensagem de agradecimento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proposalThankYouMessageSubtitle"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start">
                  <FormLabel>Mensagem de Agradecimento - Subtítulo</FormLabel>
                  <FormControl>
                    <Input
                      className="h-auto w-full border border-gray-700 py-3 pr-10 pl-5 focus:border-gray-500 focus:ring-0 md:text-lg"
                      placeholder="Digite o subtítulo da mensagem de agradecimento"
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
              className="h-[50px] max-h-full px-5 text-[16px] font-[400] [&_svg:not([class*='size-'])]:size-6"
              disabled={isLoadingUpdate || !isFormDirty}
            >
              {isLoadingUpdate ? <CgSpinner className="animate-spin" /> : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default UserProfileInfosForm;
