import SingleImageUpload from "@/shared/components/SingleImageUpload";
import { Agency } from "@/shared/models/agency.model";
import { AgencyService } from "@/shared/services/entities/agency-service/AgencyService";
import { QueryClient } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { PiBuildingLight } from "react-icons/pi";
import { toast } from "sonner";

interface AgencyLogoProps {
  agency: Agency;
  queryClient: QueryClient;
  canEdit: boolean;
}

function AgencyLogo({ agency, queryClient, canEdit }: AgencyLogoProps) {
  const [logo, setLogo] = useState<File | string | null>(agency?.logoUrl || null);
  const [isPending, startTransition] = useTransition();

  const AgencyLogoPlaceholder = () => (
    <PiBuildingLight size={100} className="text-primary group-hover:text-primary/80" />
  );

  const handleRemoveLogo = async () => {
    startTransition(async () => {
      try {
        await AgencyService.deleteAgencyLogo();
        setLogo(null);
        queryClient.invalidateQueries({ queryKey: ["agency"] });
        toast.success("Logo removida com sucesso!");
      } catch {
        toast.error("Erro ao remover logo.");
      }
    });
  };

  const handleImageChange = async (file: File | null) => {
    if (!file) {
      return handleRemoveLogo();
    }

    startTransition(async () => {
      try {
        const response = await AgencyService.updateAgencyLogo(file);
        setLogo(response.logoUrl);
        queryClient.invalidateQueries({ queryKey: ["agency"] });
        toast.success("Logo atualizada com sucesso!");
      } catch {
        toast.error("Erro ao atualizar logo.");
      }
    });
  };
  return (
    <SingleImageUpload
      currentImage={logo}
      onChange={handleImageChange}
      ImagePickerPlaceholder={AgencyLogoPlaceholder}
      isPending={isPending}
      disabled={!canEdit}
      hiddenDelete={!canEdit}
    />
  );
}

export default AgencyLogo;
