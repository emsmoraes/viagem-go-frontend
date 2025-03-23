import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { MdOutlineMail } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../../hooks/useSignUp";
import { toast } from "sonner";

const signUpSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
});

function SignUpForm() {
  const redirectUrl = `${window.location.origin}/activate-user`;

  const { signup, isLoadingSignup } = useSignupMutation({
    onSuccess: () => {
      toast.success("Cadastro concluído! Verifique seu e-mail para ativar sua conta.");
    },
    onError: () => {
      toast.error("Erro ao criar conta. Verifique se o e-mail já está em uso.");
    },
  });

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    signup({ email: values.email, redirectUrl });
  }

  return (
    <div className="w-full space-y-6 rounded-3xl bg-white px-7 py-10 shadow-xl">
      <h1 className="text-center text-4xl font-medium">
        VIAGEM<span className="text-primary">GO</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <MdOutlineMail className="text-primary" size={20} /> E-mail
                </FormLabel>
                <FormControl>
                  <Input placeholder="seuemail@exemplo.com" className="py-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-5 w-full py-5 [&_svg:not([class*='size-'])]:size-6"
            disabled={isLoadingSignup}
          >
            {isLoadingSignup ? <CgSpinner className="animate-spin" /> : "Criar conta"}
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Já tem uma conta?{" "}
          <Link to="/sign-in" className="text-primary hover:text-primary/80 cursor-pointer underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
