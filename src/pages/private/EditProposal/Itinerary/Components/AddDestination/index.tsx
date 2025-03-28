import ImagePreview from "@/shared/components/ImagePreview";
import MultipleImageUpload from "@/shared/components/MultipleImageUpload";
import { Button } from "@/shared/components/ui/button";
import { CalendarDatePicker } from "@/shared/components/ui/calendar-date-picker";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiImages } from "react-icons/pi";
import { z } from "zod";

interface DateRange {
  from: Date;
  to: Date;
}

const defaultDateRange: DateRange = {
  from: new Date(),
  to: new Date(new Date().setDate(new Date().getDate() + 1)),
};

const destinationSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  description: z.string().optional(),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .default(defaultDateRange),
  images: z
    .union([z.string(), z.instanceof(File)])
    .optional()
    .nullable()
    .array(),
});

export type DestinationSchema = z.infer<typeof destinationSchema>;

const DestinationImagesPlaceholder = () => <PiImages size={40} className="text-primary group-hover:text-primary/80" />;

function AddDestination() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: zodResolver(destinationSchema), defaultValues: { dateRange: defaultDateRange } });

  const onSubmit = (data: DestinationSchema) => {
    console.log("Destino adicionado:", data);
    setOpen(false);
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="mb-3">
            <DialogTitle>Adicionar Destino</DialogTitle>
          </DialogHeader>
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
              />
            </div>
            <Button type="submit" className="mt-5">
              Salvar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddDestination;
