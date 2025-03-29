import { Button } from "@/shared/components/ui/button";
import React, { memo, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import MultipleImageUpload from "@/shared/components/MultipleImageUpload";
import ImagePreview from "@/shared/components/ImagePreview";
import { Input } from "@/shared/components/ui/input";
import { CalendarDatePicker } from "@/shared/components/ui/calendar-date-picker";
import { PiImages } from "react-icons/pi";
import { toast } from "sonner";
import { useCreateDestinationMutation, useUpdateDestinationMutation } from "../../hooks/useDestination";
import { separateFilesAndStrings } from "@/shared/utils/separateFilesAndStrings";

const destinationSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório." }),
  description: z.string().trim().optional(),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  images: z
    .union([z.instanceof(File), z.string()])
    .array()
    .optional()
    .nullable(),
});

export type DestinationSchema = z.infer<typeof destinationSchema>;

const DestinationImagesPlaceholder = () => <PiImages size={40} className="text-primary group-hover:text-primary/80" />;

interface EditDestinationProps {
  defaultValues: DestinationSchema;
  destinationId: string;
}

function EditDestination({ defaultValues, destinationId }: EditDestinationProps) {
  const [open, setOpen] = useState(false);
  const { proposal } = useSteppers();
  const queryClient = useQueryClient();

  const { updateDestination, isLoadingUpdateDestination } = useUpdateDestinationMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      setOpen(false);
      toast("Destino editado com sucesso");
    },
    onError: () => toast("Erro ao editar destino"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    formState,
    trigger,
  } = useForm({ resolver: zodResolver(destinationSchema), defaultValues });

  const isFormDirty = Object.keys(formState.dirtyFields).length > 0;

  const images = watch("images") ?? [];

  const handleImageChange = (newFiles: File[] | null) => {
    if (newFiles) {
      const filesArray = Array.from(newFiles);
      setValue("images", [...(images || []), ...filesArray], { shouldDirty: true });
      trigger("images");
    }
  };

  const handleImageDelete = (index: number) => {
    trigger("images");
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setValue("images", updatedImages, { shouldDirty: true });
  };

  const onSubmit = (data: DestinationSchema) => {
    const { files, strings } = separateFilesAndStrings(data.images ?? []);

    updateDestination({
      id: destinationId,
      data: {
        name: data.name,
        description: data.description,
        departureDate: data.dateRange.from.toISOString(),
        returnDate: data.dateRange.to.toISOString(),
        images: files,
        existingImages: strings,
      },
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={false} size={"icon"}>
        {false ? <CgSpinner className="animate-spin" /> : <FiEdit2 />}
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogDescription />
          <AlertDialogHeader className="mb-3">
            <AlertDialogTitle>Adicionar Destino</AlertDialogTitle>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="mb-5 flex flex-wrap gap-3">
              <MultipleImageUpload
                inputClassName="w-16 h-16 rounded-md"
                ImagePickerPlaceholder={DestinationImagesPlaceholder}
                onChange={handleImageChange}
                currentImagesLength={images.length}
                max={5}
              />
              {images.map((image, index) => (
                <ImagePreview
                  imgClassName="rounded-md"
                  key={index}
                  currentImage={image}
                  onDelete={() => handleImageDelete(index)}
                  className="h-16 w-16 rounded-md"
                />
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium">Nome</label>
              <Input {...register("name")} placeholder="Digite o nome" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Descrição</label>
              <Input {...register("description")} placeholder="Digite a descrição" />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium">Período</label>
              <CalendarDatePicker
                onDateSelect={(dateRange) => setValue("dateRange", dateRange)}
                date={watch("dateRange")}
                className="w-full"
                variant={"outline"}
                closeOnSelect={true}
              />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>

              <Button
                type="submit"
                className="flex-1 [&_svg:not([class*='size-'])]:size-6"
                disabled={!isFormDirty || isLoadingUpdateDestination}
              >
                {isLoadingUpdateDestination ? <CgSpinner className="animate-spin" /> : "Salvar"}
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default memo(EditDestination);
