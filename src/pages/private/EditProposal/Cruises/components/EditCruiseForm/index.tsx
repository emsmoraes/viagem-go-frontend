"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import MoneyInput from "@/shared/components/Form/MoneyInput";
import { DatePickerInput } from "@/shared/components/Form/DatePickerInput";
import { Textarea } from "@/shared/components/ui/textarea";
import { PiFiles, PiImages } from "react-icons/pi";
import MultipleImageUpload from "@/shared/components/MultipleImageUpload";
import ImagePreview from "@/shared/components/ImagePreview";
import FilePreview from "@/shared/components/FilePreview";
import { useQueryClient } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { separateFilesAndStrings } from "@/shared/utils/separateFilesAndStrings";
import { useUpdateCruiseMutation } from "../../hooks/useCruises";
import { UpdateCruiseRequest } from "@/shared/services/entities";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";

const cruiseSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  cabin: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  route: z.string().optional(),
  description: z.string().optional(),
  paymentMethods: z.string().optional(),
  images: z
    .array(z.union([z.instanceof(File), z.string()]))
    .optional()
    .nullable(),
  files: z
    .array(z.union([z.instanceof(File), z.string()]))
    .optional()
    .nullable(),
});

export type EditCruiseSchema = z.infer<typeof cruiseSchema>;

const CruiseImagesPlaceholder = () => <PiImages size={40} className="text-primary group-hover:text-primary/80" />;
const CruiseFilesPlaceholder = () => <PiFiles size={40} className="text-primary group-hover:text-primary/80" />;

type EditCruiseFormProps = {
  defaultValues: EditCruiseSchema;
  cruiseId: string;
};

function EditCruiseForm({ defaultValues, cruiseId }: EditCruiseFormProps) {
  const { proposal } = useSteppers();
  const queryClient = useQueryClient();

  const { updateCruise, isLoadingUpdateCruise } = useUpdateCruiseMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      form.reset(form.watch());
      toast("Cruzeiro atualizado com sucesso!");
    },
    onError: () => {
      toast("Erro ao atualizar cruzeiro");
    },
  });

  const form = useForm<EditCruiseSchema>({
    resolver: zodResolver(cruiseSchema),
    defaultValues,
  });

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;
  const images = form.watch("images") ?? [];
  const files = form.watch("files") ?? [];

  const handleImageChange = (newFiles: File[] | null) => {
    if (newFiles) {
      const filesArray = Array.from(newFiles);
      form.setValue("images", [...images, ...filesArray], { shouldDirty: true });
    }
  };

  const handleFilesChange = (newFiles: File[] | null) => {
    if (newFiles) {
      const filesArray = Array.from(newFiles);
      form.setValue("files", [...files, ...filesArray], { shouldDirty: true });
    }
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    form.setValue("images", updatedImages, { shouldDirty: true });
  };

  const handleFileDelete = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    form.setValue("files", updatedFiles, { shouldDirty: true });
  };

  const onSubmit = (values: EditCruiseSchema) => {
    if (!proposal || !cruiseId) return;

    const { files: imageFiles, strings: imageStrings } = separateFilesAndStrings(values.images ?? []);
    const { files, strings } = separateFilesAndStrings(values.files ?? []);

    const formData: UpdateCruiseRequest = {
      ...values,
      imageUrls: imageStrings,
      fileUrls: strings,
      images: imageFiles,
      files: files,
    };

    updateCruise({
      cruiseId,
      proposalId: proposal.id,
      data: formData,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <FormLabel>Imagens</FormLabel>
            <div className="flex flex-wrap gap-3">
              <MultipleImageUpload
                inputClassName="w-16 h-16 rounded-md"
                ImagePickerPlaceholder={CruiseImagesPlaceholder}
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
          </div>

          <div className="space-y-2">
            <FormLabel>Arquivos</FormLabel>
            <div className="flex flex-wrap gap-3">
              <MultipleImageUpload
                inputClassName="w-16 h-16 rounded-md"
                ImagePickerPlaceholder={CruiseFilesPlaceholder}
                onChange={handleFilesChange}
                currentFilesLength={files.length}
                max={5}
                accept=".pdf"
              />
              {files.map((file, index) => (
                <FilePreview
                  onDelete={() => handleFileDelete(index)}
                  className="border-primary bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-md border"
                  key={index}
                  currentFile={file}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do cruzeiro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cabin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cabine</FormLabel>
                <FormControl>
                  <Input placeholder="Tipo de cabine" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de embarque</FormLabel>
                <DatePickerInput
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                  placeholder="Selecione a data"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de retorno</FormLabel>
                <DatePickerInput
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date ? date.toISOString() : null)}
                  placeholder="Selecione a data"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="route"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roteiro</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Santos - Rio - Salvador" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethods"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Formas de pagamento</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: PIX, Cartão, Boleto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição detalhada do cruzeiro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex-1 [&_svg:not([class*='size-'])]:size-6"
          disabled={!isFormDirty || isLoadingUpdateCruise}
        >
          {isLoadingUpdateCruise ? <CgSpinner className="animate-spin" /> : "Atualizar"}
        </Button>
      </form>
    </Form>
  );
}

export default EditCruiseForm;
