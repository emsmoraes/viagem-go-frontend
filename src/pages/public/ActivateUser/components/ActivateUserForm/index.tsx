import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { MdOutlineLock, MdOutlineMail, MdOutlineVisibility, MdOutlineVisibilityOff, MdPerson } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { useActiveUserMutation } from "../../hooks/useActiveUser";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const activationSchema = z
  .object({
    name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
    password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
    passwordConfirm: z.string().min(6, { message: "A confirmação de senha deve ter no mínimo 6 caracteres." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não coincidem.",
    path: ["passwordConfirm"],
  });

interface ActivateUserFormProps {
  email: string;
  validKey: string;
}

function ActivateUserForm({ email, validKey }: ActivateUserFormProps) {
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const navigate = useNavigate();

  const { activeUser, isLoadingActiveUser } = useActiveUserMutation({
    onSuccess: () => {
      toast.success("Usuário ativado com sucesso!");
      navigate("/sign-in");
    },
    onError: (error) => {
      toast.error("Erro ao ativar usuário");
    },
  });

  const form = useForm({
    resolver: zodResolver(activationSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof activationSchema>) {
    if (email) activeUser(validKey, values);
  }

  return (
    <div className="w-full space-y-6 bg-white rounded-3xl shadow-xl px-7 py-10">
      <h1 className="text-4xl font-medium text-center">
        VIAGEM<span className="text-primary">GO</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormItem>
            <FormLabel>
              <MdOutlineMail className="text-primary" size={20} /> E-mail
            </FormLabel>
            <FormControl>
              <Input value={email} disabled className="py-5 bg-gray-100 text-gray-500" />
            </FormControl>
          </FormItem>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <MdPerson className="text-primary" size={20} /> Nome
                </FormLabel>
                <FormControl>
                  <Input disabled={!email} placeholder="Seu nome completo" className="py-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      disabled={!email}
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

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <MdOutlineLock className="text-primary" size={20} /> Confirmar Senha
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      disabled={!email}
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

          <Button disabled={!email} type="submit" className="w-full py-5 mt-5 [&_svg:not([class*='size-'])]:size-6">
            {isLoadingActiveUser ? <CgSpinner className="animate-spin" /> : "Ativar Conta"}
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Já tem uma conta?{" "}
          <Link to="/sign-in" className="text-primary underline cursor-pointer hover:text-primary/80">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ActivateUserForm;
