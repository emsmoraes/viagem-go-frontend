import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
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
import { CgSpinner } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAddAgencyUserMutation } from "../../hooks/useAgencyUsers";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const inviteSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido." }),
});

function InviteUserModal({ agencyId }: { agencyId: string }) {
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(inviteSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { addAgencyUser, isLoadingAddUser } = useAddAgencyUserMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agency"] });
      setOpenInviteModal(false);
      form.reset();
      toast("Convite enviado com  sucesso!");
    },
    onError: (error) => {
      toast("Erro ao enviar convite");
    },
  });

  async function onSubmit(values: z.infer<typeof inviteSchema>) {
    addAgencyUser({
      email: values.email,
      redirectUrl: `${window.location.origin}/activate-user`,
      agencyId: agencyId,
    });
  }

  return (
    <Dialog onOpenChange={setOpenInviteModal} open={openInviteModal}>
      <DialogTrigger asChild>
        <IoIosAddCircleOutline className="text-primary hover:text-primary/80 cursor-pointer" size={28} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-3">
          <DialogTitle>Convidar novo usuário</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isLoadingAddUser} className="w-full [&_svg:not([class*='size-'])]:size-6">
                {isLoadingAddUser ? <CgSpinner className="animate-spin" /> : "Enviar Convite"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default InviteUserModal;
