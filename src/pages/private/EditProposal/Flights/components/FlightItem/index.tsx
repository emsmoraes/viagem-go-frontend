import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { Ticket } from "@/shared/models/ticket.model";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useForm } from "react-hook-form";
import { MdFlight } from "react-icons/md";
import { PiFiles, PiImages } from "react-icons/pi";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import MultipleImageUpload from "@/shared/components/MultipleImageUpload";
import ImagePreview from "@/shared/components/ImagePreview";
import FilePreview from "@/shared/components/FilePreview";
import MoneyInput from "@/shared/components/Form/MoneyInput";
import { DatePickerInput } from "@/shared/components/Form/DatePickerInput";
import { Textarea } from "@/shared/components/ui/textarea";
import { CgSpinner } from "react-icons/cg";
import { Separator } from "@/shared/components/ui/separator";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { useDeleteFlightMutation } from "../../hooks/useFlights";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSteppers } from "../../../contexts/SteppersContext/useSteppers";

const flightSchema = z.object({
  origin: z.string().trim().min(1, { message: "Origem é obrigatória." }),
  destination: z.string().trim().min(1, { message: "Destino é obrigatório." }),
  type: z.enum(["OUTBOUND", "INBOUND", "INTERNAL"], {
    errorMap: () => ({ message: "Selecione um tipo válido." }),
  }),
  baggagePerPerson: z
    .number()
    .optional()
    .refine((val) => val === undefined || val >= 0, {
      message: "O número de bagagens deve ser positivo.",
    }),
  duration: z.string().optional(),
  price: z.number().min(0).optional(),
  arrivalAt: z.date().optional(),
  departureAt: z.date().optional(),
  observation: z.string().optional(),
  images: z
    .array(z.union([z.instanceof(File), z.string()]))
    .optional()
    .nullable(),
  files: z
    .array(z.union([z.instanceof(File), z.string()]))
    .optional()
    .nullable(),
});

export type FlightSchema = z.infer<typeof flightSchema>;

interface FlightItemProps {
  flight: Ticket;
  defaultValues: FlightSchema;
}

const DestinationImagesPlaceholder = () => <PiImages size={40} className="text-primary group-hover:text-primary/80" />;
const DestinationFilesPlaceholder = () => <PiFiles size={40} className="text-primary group-hover:text-primary/80" />;

function FlightItem({ flight, defaultValues }: FlightItemProps) {
  const queryClient = useQueryClient();
  const { proposal } = useSteppers();

  const { deleteFlight, isLoadingDeleteFlight } = useDeleteFlightMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal?.id] });
      toast("Destino excluído com sucesso. Alterações salvas!");
    },
    onError: () => {
      toast("Erro ao excluir destino");
    },
  });
  const form = useForm({
    resolver: zodResolver(flightSchema),
    defaultValues,
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

  const onSubmit = async (values: FlightSchema) => {
    console.log(values);
  };

  const handleDelete = () => {
    if (!proposal) return;
    deleteFlight({ proposalId: proposal.id, ticketId: flight.id });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-xl bg-white p-4 shadow-md">
        <AccordionTrigger className="flex justify-between">
          <div className="flex-1">
            <span className="flex items-center gap-5 text-lg font-medium">
              {flight.origin} <MdFlight size={22} className="text-primary rotate-90" /> {flight.destination}
            </span>

            {flight.duration && (
              <span className="mt-3 mb-1 flex items-center gap-3 text-sm text-gray-600">
                Em: {moment(flight.departureAt).format("DD/MM/YYYY")} -{" "}
                {moment(flight.departureAt).format("DD/MM/YYYY")}
              </span>
            )}
            {flight.duration && <span className="text-sm text-gray-600">Duração: {flight.duration} hrs</span>}
          </div>
          <div className="flex items-center gap-2">
            <Button size={"icon"}>
              <FiEdit2 />
            </Button>
            <Button
              disabled={isLoadingDeleteFlight}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              size={"icon"}
              variant={"destructive"}
            >
              {isLoadingDeleteFlight ? <CgSpinner className="animate-spin" /> : <HiOutlineTrash />}
            </Button>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Separator className="my-6" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel>Imagens</FormLabel>
                  <div className="flex flex-wrap gap-3">
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
                </div>

                <div className="space-y-2">
                  <FormLabel>Arquivos</FormLabel>
                  <div className="flex flex-wrap gap-3">
                    <MultipleImageUpload
                      inputClassName="w-16 h-16 rounded-md"
                      ImagePickerPlaceholder={DestinationFilesPlaceholder}
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
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origem</FormLabel>
                      <FormControl>
                        <Input placeholder="Origem do voo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destino</FormLabel>
                      <FormControl>
                        <Input placeholder="Destino do voo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="OUTBOUND">Ida</SelectItem>
                          <SelectItem value="INBOUND">Volta</SelectItem>
                          <SelectItem value="INTERNAL">Interno</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="baggagePerPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bagagem por Pessoa</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Número de bagagens"
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração</FormLabel>
                      <FormControl>
                        <Input placeholder="Duração do voo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Preço</FormLabel>
                  <MoneyInput form={form} name="price" placeholder="Preço." />
                </div>

                <FormField
                  control={form.control}
                  name="departureAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partida em</FormLabel>
                      <DatePickerInput
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) => field.onChange(date)}
                        placeholder="Data e hora de partida"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="arrivalAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chegada em</FormLabel>
                      <DatePickerInput
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) => field.onChange(date)}
                        placeholder="Data e hora de chegada"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="observation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observação</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Observações adicionais" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="flex-1 [&_svg:not([class*='size-'])]:size-6" disabled={false}>
                {false ? <CgSpinner className="animate-spin" /> : "Salvar"}
              </Button>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default FlightItem;
