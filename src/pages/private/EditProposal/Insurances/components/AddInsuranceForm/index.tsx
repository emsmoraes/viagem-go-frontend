import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import MultipleImageUpload from "@/shared/components/MultipleImageUpload";
import ImagePreview from "@/shared/components/ImagePreview";
import FilePreview from "@/shared/components/FilePreview";
import { PiFiles, PiImages } from "react-icons/pi";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { CreateInsuranceRequest } from "@/shared/services/entities";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useCreateInsuranceMutation } from "../../hooks/useInsurance";
import MoneyInput from "@/shared/components/Form/MoneyInput";

const addInsuranceFormSchema = z.object({
  title: z.string().min(1, { message: "Tipo é obrigatório" }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Informe um valor válido").optional(),
  images: z.instanceof(File).array().optional().nullable(),
  files: z.instanceof(File).array().optional().nullable(),
});

export type InsuranceSchema = z.infer<typeof addInsuranceFormSchema>;

const InsuranceImagesPlaceholder = () => <PiImages size={40} className="text-primary group-hover:text-primary/80" />;
const InsuranceFilesPlaceholder = () => <PiFiles size={40} className="text-primary group-hover:text-primary/80" />;

function AddInsuranceForm({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { createInsurance, isLoadingCreateInsurance } = useCreateInsuranceMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      form.reset();
      setOpen(false);
      toast("Seguro criado com sucesso!");
    },
    onError: () => {
      toast("Erro ao criar seguro.");
    },
  });

  const form = useForm<InsuranceSchema>({
    resolver: zodResolver(addInsuranceFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      images: [],
      files: [],
    },
  });

  const images = form.watch("images") ?? [];
  const files = form.watch("files") ?? [];

  const handleImageChange = (newFiles: File[] | null) => {
    if (newFiles) {
      form.setValue("images", [...images, ...newFiles]);
    }
  };

  const handleFilesChange = (newFiles: File[] | null) => {
    if (newFiles) {
      form.setValue("files", [...files, ...newFiles]);
    }
  };

  const handleImageDelete = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    form.setValue("images", updated);
  };

  const handleFileDelete = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    form.setValue("files", updated);
  };

  const onSubmit = (values: InsuranceSchema) => {
    if (!proposal) return;

    const payload: CreateInsuranceRequest = {
      ...values,
      images,
      files,
      proposalId: proposal.id,
    };

    createInsurance(payload);
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
                ImagePickerPlaceholder={InsuranceImagesPlaceholder}
                onChange={handleImageChange}
                currentFilesLength={images.length}
                max={5}
              />
              {images.map((img, i) => (
                <ImagePreview
                  key={i}
                  currentImage={img}
                  onDelete={() => handleImageDelete(i)}
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
                ImagePickerPlaceholder={InsuranceFilesPlaceholder}
                onChange={handleFilesChange}
                currentFilesLength={files.length}
                max={5}
                accept=".pdf"
              />
              {files.map((file, i) => (
                <FilePreview
                  key={i}
                  currentFile={file}
                  onDelete={() => handleFileDelete(i)}
                  className="border-primary bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-md border"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <Input placeholder="Tipo de seguro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <MoneyInput placeholder="Digite o preço" form={form} name="price" label="Preço" />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição do seguro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoadingCreateInsurance} className="flex-1 [&_svg]:size-6">
          {isLoadingCreateInsurance ? <CgSpinner className="animate-spin" /> : "Salvar"}
        </Button>
      </form>
    </Form>
  );
}

export default AddInsuranceForm;
