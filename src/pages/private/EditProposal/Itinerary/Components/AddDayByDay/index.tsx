import ImagePreview from "@/shared/components/ImagePreview";
import MultipleImageUpload from "@/shared/components/MultipleImageUpload";
import { Button } from "@/shared/components/ui/button";
import { CalendarDatePicker } from "@/shared/components/ui/calendar-date-picker";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiImages } from "react-icons/pi";
import { z } from "zod";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateDayByDayMutation } from "../../hooks/useDayByDay";

export interface DateRange {
  from: Date;
  to: Date;
}

const defaultDateRange: DateRange = {
  from: new Date(),
  to: new Date(new Date().setDate(new Date().getDate() + 1)),
};

const destinationSchema = z.object({
  title: z.string().trim().min(1, { message: "O nome é obrigatório." }),
  description: z.string().trim().optional(),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .default(defaultDateRange),
  images: z.instanceof(File).array().optional().nullable(),
});

export type DestinationSchema = z.infer<typeof destinationSchema>;

const DestinationImagesPlaceholder = () => <PiImages size={40} className="text-primary group-hover:text-primary/80" />;

function AddDayByDay() {
  const [open, setOpen] = useState(false);
  const { proposal } = useSteppers();
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({ resolver: zodResolver(destinationSchema), defaultValues: { dateRange: defaultDateRange } });

  const { createDayByDay, isLoadingCreateDayByDay } = useCreateDayByDayMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      setOpen(false);
      reset();
      toast("Day by day adicionado com sucesso. Alterações salvas!");
    },
    onError: () => toast("Erro ao criar day by day"),
  });

  const onSubmit = (data: DestinationSchema) => {
    createDayByDay({
      title: data.title,
      description: data.description,
      departureDate: data.dateRange.from.toISOString(),
      returnDate: data.dateRange.to.toISOString(),
      images: data.images ?? [],
      proposalId: proposal?.id!,
    });
  };

  const images = watch("images") ?? [];

  const handleImageChange = (newFiles: File[] | null) => {
    if (newFiles) {
      const filesArray = Array.from(newFiles);
      setValue("images", [...(images || []), ...filesArray]);
    }
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setValue("images", updatedImages);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="[&_svg:not([class*='size-'])]:size-6">
        <IoIosAddCircleOutline /> Adicionar
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogDescription />
          <AlertDialogHeader className="mb-3">
            <AlertDialogTitle>Adicionar Day by Day</AlertDialogTitle>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="mb-5 flex flex-wrap gap-3">
              <MultipleImageUpload
                inputClassName="w-16 h-16 rounded-md"
                ImagePickerPlaceholder={DestinationImagesPlaceholder}
                onChange={handleImageChange}
                currentFilesLength={images.length}
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
              <Input {...register("title")} placeholder="Digite o nome" />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
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
                disabled={isLoadingCreateDayByDay}
              >
                {isLoadingCreateDayByDay ? <CgSpinner className="animate-spin" /> : "Salvar"}
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AddDayByDay;
