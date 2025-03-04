import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { authStore } from "@/shared/store/auth.store";
import { MdOutlineLock, MdOutlineMail, MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useSigninMutation } from "../../hooks/useSignIn";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
});

function SignInForm() {
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const navigate = useNavigate();

  const { authenticate } = authStore();

  const { signin, isLoadingSignin } = useSigninMutation({
    onSuccess: (data) => {
      authenticate(data.access_token, data.user);
      navigate("/");
    },
    onError: () => {
      toast.error("Erro ao logar, verifique suas credenciais.");
    },
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    signin(values);
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
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <MdOutlineLock className="text-primary" size={20} /> Senha
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isRevealPassword ? "text" : "password"}
                        placeholder="********"
                        className="py-5"
                        {...field}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsRevealPassword(!isRevealPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent hover:text-primary [&_svg:not([class*='size-'])]:size-5"
                      >
                        {isRevealPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-primary underline cursor-pointer hover:text-primary/80 mt-2"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full py-5 mt-5 [&_svg:not([class*='size-'])]:size-6">
            {isLoadingSignin ? <CgSpinner className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Não tem uma conta?{" "}
          <Link to="/sign-up" className="text-primary underline cursor-pointer hover:text-primary/80">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInForm;
