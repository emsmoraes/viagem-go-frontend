import { Experience } from "@/shared/models/experience.model";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useDeleteExperienceMutation } from "../../hooks/useExperience";
import EditExperienceForm from "../EditExperienceForm";

function ExperienceItem({ experience }: { experience: Experience }) {
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { deleteExperience, isLoadingDeleteExperience } = useDeleteExperienceMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Experiência excluída com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao excluir experiência.");
    },
  });

  const handleDelete = () => {
    if (!proposal) return;
    deleteExperience({ proposalId: proposal.id, experienceId: experience.id });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger className="flex justify-between">
          <div className="flex-1">
            <span className="flex items-center gap-5 text-lg font-medium capitalize">
              {experience.type}
              {experience.price && Number(experience.price) > 0 && (
                <span className="text-sm text-gray-500">– R$ {Number(experience.price).toFixed(2)}</span>
              )}
            </span>

            {experience.description && (
              <span className="mt-1 block text-sm text-gray-600">{experience.description}</span>
            )}

            <div className="mt-2 space-y-1 text-xs text-gray-400">
              <p>Criado em: {moment(experience.createdAt).format("DD/MM/YYYY HH:mm")}</p>
              <p>Atualizado em: {moment(experience.updatedAt).format("DD/MM/YYYY HH:mm")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon">
              <FiEdit2 />
            </Button>
            <Button
              disabled={isLoadingDeleteExperience}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              size="icon"
              variant="destructive"
            >
              {isLoadingDeleteExperience ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
            </Button>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <Separator className="my-6" />
          <EditExperienceForm
            experienceId={experience.id}
            defaultValues={{
              type: experience.type,
              description: experience.description ?? "",
              files: experience.files,
              images: experience.images,
              price: Number(experience.price) ?? 0,
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ExperienceItem;
