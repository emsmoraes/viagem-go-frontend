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
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";
import { useQueryClient } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { useCreateAccommodationMutation } from "../../hooks/useAccomodations";
import { CreateAccommodationRequest } from "@/shared/services/entities";

const accommodationSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório." }),
  location: z.string().optional(),
  address: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  category: z.string().optional(),
  boardType: z.string().optional(),
  roomType: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  images: z.instanceof(File).array().optional().nullable(),
  files: z.instanceof(File).array().optional().nullable(),
});

export type AccommodationSchema = z.infer<typeof accommodationSchema>;

const AccommodationImagesPlaceholder = () => (
  <PiImages size={40} className="text-primary group-hover:text-primary/80" />
);
const AccommodationFilesPlaceholder = () => <PiFiles size={40} className="text-primary group-hover:text-primary/80" />;

function AddAccommodationForm({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { proposal } = useSteppers();
  const queryClient = useQueryClient();

  const { createAccommodation, isLoadingCreateAccommodation } = useCreateAccommodationMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      form.reset();
      setOpen(false);
      toast("hospedagem criada com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao criar hospedagem");
    },
  });

  const form = useForm({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      name: "",
      location: "",
      address: "",
      checkIn: "",
      checkOut: "",
      category: "",
      boardType: "",
      roomType: "",
      description: "",
      price: 0,
      images: null,
      files: null,
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
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    form.setValue("images", updatedImages);
  };

  const handleFileDelete = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    form.setValue("files", updatedFiles);
  };

  const onSubmit = (values: AccommodationSchema) => {
    if (!proposal) return;
    const formData: CreateAccommodationRequest = {
      ...values,
      images,
      files,
      proposalId: proposal.id,
    };

    createAccommodation(formData);
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
                ImagePickerPlaceholder={AccommodationImagesPlaceholder}
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
                ImagePickerPlaceholder={AccommodationFilesPlaceholder}
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
                  <Input placeholder="Nome da hospedagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade, país ou link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Endereço completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Categoria da hospedagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="boardType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Alimentação</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Café da manhã incluso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Quarto</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Quarto duplo, suíte" {...field} />
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
                <FormLabel>Check-in</FormLabel>
                <DatePickerInput
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date)}
                  placeholder="Data de check-in"
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
                <FormLabel>Check-out</FormLabel>
                <DatePickerInput
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date)}
                  placeholder="Data de check-out"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Preço</FormLabel>
            <MoneyInput form={form} name="price" placeholder="Preço da hospedagem" />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Descrição da hospedagem" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex-1 [&_svg:not([class*='size-'])]:size-6"
          disabled={isLoadingCreateAccommodation}
        >
          {isLoadingCreateAccommodation ? <CgSpinner className="animate-spin" /> : "Salvar"}
        </Button>
      </form>
    </Form>
  );
}

export default AddAccommodationForm;
