import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EditProposalInfosForm from "../EditProposalInfosForm";
import { Button } from "@/shared/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import SingleImageUpload from "@/shared/components/SingleImageUpload";
import { PiMountains } from "react-icons/pi";
import { toast } from "sonner";
import { UpdateProposalRequest } from "@/shared/services/entities/proposal-service/ProposalService";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProposalMutation } from "../../hooks/useEditProposal";

const proposalSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  status: z.enum(["INCOMPLETE", "AWAITING_RESPONSE", "CONFIRMED", "LOST"]),
  departureDate: z
    .union([z.string().datetime(), z.literal("").optional(), z.null()])
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Data de retorno inválida.",
    }),
  returnDate: z
    .union([z.string().datetime(), z.literal("").optional(), z.null()])
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Data de retorno inválida.",
    }),
  profileImage: z
    .union([z.string(), z.instanceof(File)])
    .optional()
    .nullable(),
});

export type ProposalSchema = z.infer<typeof proposalSchema>;

interface EditProposalProfileProps {
  defaultValues: ProposalSchema;
  proposalId: string;
}

function EditProposalProfile({ defaultValues, proposalId }: EditProposalProfileProps) {
  const UserAvatarPlaceholder = () => <PiMountains size={100} className="text-primary group-hover:text-primary/80" />;
  const queryClient = useQueryClient();

  const form = useForm<ProposalSchema>({
    resolver: zodResolver(proposalSchema),
    defaultValues,
  });

  const { updateProposal, isLoadingUpdateProposal } = useUpdateProposalMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposalId] });
      queryClient.refetchQueries({ queryKey: ["proposals"] });

      toast.success("Proposta atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar proposta.");
    },
  });

  const handleImageChange = (file: File | null) => {
    form.setValue("profileImage", file);
  };

  const onSubmit = (data: ProposalSchema) => {
    const payload: UpdateProposalRequest = {
      ...data,
      departureDate: data.departureDate || undefined,
      returnDate: data.returnDate || undefined,
      cover: data.profileImage instanceof File ? data.profileImage : undefined,
    };

    updateProposal(proposalId, payload);
  };

  return (
    <div className="w-full lg:pr-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex w-full flex-wrap gap-12">
          <SingleImageUpload
            currentImage={form.watch("profileImage")}
            onChange={handleImageChange}
            isPending={isLoadingUpdateProposal}
            errorMessage={form.formState.errors.profileImage?.message}
            ImagePickerPlaceholder={UserAvatarPlaceholder}
            hiddenDelete={true}
          />

          <EditProposalInfosForm form={form} />
        </div>

        <div className="mt-8 flex w-full justify-end">
          <Button
            type="submit"
            className="h-[50px] max-h-full px-5 text-[16px] font-[400] [&_svg:not([class*='size-'])]:size-6"
            disabled={isLoadingUpdateProposal}
          >
            {isLoadingUpdateProposal ? <CgSpinner className="animate-spin" /> : "Salvar alterações"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProposalProfile;
