import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import MoneyInput from "@/shared/components/Form/MoneyInput";
import { DatePickerInput } from "@/shared/components/Form/DatePickerInput";
import MultipleImageUpload from "@/shared/components/MultipleImageUpload";
import ImagePreview from "@/shared/components/ImagePreview";
import FilePreview from "@/shared/components/FilePreview";
import { PiFiles, PiImages } from "react-icons/pi";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import { useCreateCruiseMutation } from "../../hooks/useCruises";
import { CreateCruiseRequest } from "@/shared/services/entities";

const cruiseSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  cabin: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  route: z.string().optional(),
  description: z.string().optional(),
  paymentMethods: z.string().optional(),
  images: z.instanceof(File).array().optional().nullable(),
  files: z.instanceof(File).array().optional().nullable(),
});

export type CruiseSchema = z.infer<typeof cruiseSchema>;

const CruiseImagesPlaceholder = () => <PiImages size={40} className="text-primary group-hover:text-primary/80" />;
const CruiseFilesPlaceholder = () => <PiFiles size={40} className="text-primary group-hover:text-primary/80" />;

function AddCruiseForm({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { proposal } = useSteppers();
  const queryClient = useQueryClient();

  const { createCruise, isLoadingCreateCruise } = useCreateCruiseMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      form.reset();
      setOpen(false);
      toast("Cruzeiro criado com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao criar cruzeiro");
    },
  });

  const form = useForm<CruiseSchema>({
    resolver: zodResolver(cruiseSchema),
    defaultValues: {
      name: "",
      cabin: "",
      checkIn: "",
      checkOut: "",
      route: "",
      description: "",
      images: [],
      files: [],
    },
  });

  const images = form.watch("images") ?? [];
  const files = form.watch("files") ?? [];

  const handleImageChange = (newFiles: File[] | null) => {
    if (newFiles) {
      const filesArray = Array.from(newFiles);
      form.setValue("images", [...(images || []), ...filesArray]);
    }
  };

  const handleFilesChange = (newFiles: File[] | null) => {
    if (newFiles) {
      const filesArray = Array.from(newFiles);
      form.setValue("files", [...(files || []), ...filesArray]);
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

  const onSubmit = (values: CruiseSchema) => {
    if (!proposal) return;

    const formData: CreateCruiseRequest = {
      ...values,
      images,
      files,
      proposalId: proposal.id,
    };

    createCruise(formData);
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
                currentFilesLength={images?.length || 0}
                max={5}
              />
              {images?.map((img, i) => (
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
                ImagePickerPlaceholder={CruiseFilesPlaceholder}
                onChange={handleFilesChange}
                currentFilesLength={files?.length || 0}
                max={5}
                accept=".pdf"
              />
              {files?.map((file, i) => (
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

        <Button type="submit" disabled={isLoadingCreateCruise} className="flex-1 [&_svg]:size-6">
          {isLoadingCreateCruise ? <CgSpinner className="animate-spin" /> : "Salvar"}
        </Button>
      </form>
    </Form>
  );
}

export default AddCruiseForm;
