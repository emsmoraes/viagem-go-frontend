import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { MdOutlineMail } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const recoverPasswordSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
});

function ForgotPasswordForm() {
  const redirectUrl = `${window.location.origin}/reset-password`;

  const form = useForm({
    resolver: zodResolver(recoverPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof recoverPasswordSchema>) {
    console.log(values);
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

          <Button type="submit" className="w-full py-5 mt-5 [&_svg:not([class*='size-'])]:size-6" disabled={false}>
            {false ? <CgSpinner className="animate-spin" /> : "Recuperar senha"}
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

export default ForgotPasswordForm;
