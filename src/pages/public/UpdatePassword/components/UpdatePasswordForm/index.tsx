import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "../../hooks/useUpdatePassword";

const updatePasswordSchema = z
  .object({
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não coincidem.",
    path: ["passwordConfirm"],
  });

function UpdatePasswordForm({ validKey }: { validKey: string }) {
  const navigate = useNavigate();

  const { updatePassword, isLoadingUpdatePassword } = useUpdatePasswordMutation({
    onSuccess: () => {
      toast.success("Senha atualizada com sucesso!");
      navigate("/sign-in");
    },
    onError: () => {
      toast.error("Erro ao atualizar senha. Verifique se a senha é válida.");
    },
  });

  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
    updatePassword(validKey, values.password, values.passwordConfirm);
  }

  return (
    <div className="w-full space-y-6 bg-white rounded-3xl shadow-xl px-7 py-10">
      <h1 className="text-4xl font-medium text-center ">
        VIAGEM<span className="text-primary">GO</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Digite sua nova senha" className="py-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirme sua nova senha" className="py-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-5 mt-5 [&_svg:not([class*='size-'])]:size-6"
            disabled={isLoadingUpdatePassword}
          >
            {isLoadingUpdatePassword ? <CgSpinner className="animate-spin" /> : "Atualizar Senha"}
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Lembrou sua senha?{" "}
          <Link to="/sign-in" className="text-primary underline cursor-pointer hover:text-primary/80">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UpdatePasswordForm;
