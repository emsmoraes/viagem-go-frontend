import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import MoneyInput from "@/shared/components/Form/MoneyInput";
import { Textarea } from "@/shared/components/ui/textarea";
import { PiFiles, PiImages } from "react-icons/pi";
import MultipleImageUpload from "@/shared/components/MultipleImageUpload";
import ImagePreview from "@/shared/components/ImagePreview";
import FilePreview from "@/shared/components/FilePreview";
import { useQueryClient } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { separateFilesAndStrings } from "@/shared/utils/separateFilesAndStrings";
import { UpdateExtraRequest } from "@/shared/services/entities";
import { useUpdateExtraMutation } from "../../hooks/useExtra"; // <-- nome do novo hook

const extraSchema = z.object({
  title: z.string().min(1, { message: "Tipo é obrigatório" }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Informe um valor válido").optional(),
  images: z
    .array(z.union([z.instanceof(File), z.string()]))
    .optional()
    .nullable(),
  files: z
    .array(z.union([z.instanceof(File), z.string()]))
    .optional()
    .nullable(),
});

export type EditExtraSchema = z.infer<typeof extraSchema>;

const ExtraImagesPlaceholder = () => <PiImages size={40} className="text-primary group-hover:text-primary/80" />;
const ExtraFilesPlaceholder = () => <PiFiles size={40} className="text-primary group-hover:text-primary/80" />;

type EditExtraFormProps = {
  defaultValues: EditExtraSchema;
  extraId: string;
};

function EditExtraForm({ defaultValues, extraId }: EditExtraFormProps) {
  const { proposal } = useSteppers();
  const queryClient = useQueryClient();

  const { updateExtra, isLoadingUpdateExtra } = useUpdateExtraMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      form.reset(form.watch());
      toast("Extra atualizado com sucesso!");
    },
    onError: () => {
      toast("Erro ao atualizar extra");
    },
  });

  const form = useForm<EditExtraSchema>({
    resolver: zodResolver(extraSchema),
    defaultValues,
  });

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;
  const images = form.watch("images") ?? [];
  const files = form.watch("files") ?? [];

  const handleImageChange = (newFiles: File[] | null) => {
    if (newFiles) {
      form.setValue("images", [...images, ...newFiles], { shouldDirty: true });
    }
  };

  const handleFilesChange = (newFiles: File[] | null) => {
    if (newFiles) {
      form.setValue("files", [...files, ...newFiles], { shouldDirty: true });
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

  const onSubmit = (values: EditExtraSchema) => {
    if (!proposal || !extraId) return;

    const { files: imageFiles, strings: imageStrings } = separateFilesAndStrings(values.images ?? []);
    const { files, strings } = separateFilesAndStrings(values.files ?? []);

    const formData: UpdateExtraRequest = {
      ...values,
      imageUrls: imageStrings,
      fileUrls: strings,
      images: imageFiles,
      files: files,
    };

    updateExtra({
      extraId,
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
                ImagePickerPlaceholder={ExtraImagesPlaceholder}
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
                ImagePickerPlaceholder={ExtraFilesPlaceholder}
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

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <Input placeholder="Tipo do extra" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MoneyInput placeholder="Digite o preço" form={form} name="price" label="Preço" />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição detalhada do extra" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex-1 [&_svg:not([class*='size-'])]:size-6"
          disabled={!isFormDirty || isLoadingUpdateExtra}
        >
          {isLoadingUpdateExtra ? <CgSpinner className="animate-spin" /> : "Atualizar"}
        </Button>
      </form>
    </Form>
  );
}

export default EditExtraForm;
