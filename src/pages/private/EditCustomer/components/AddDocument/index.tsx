import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import FilePreview from "@/shared/components/FilePreview";
import { IoDocumentAttachOutline } from "react-icons/io5";
import MultipleImageUpload from "@/shared/components/MultipleImageUpload";
import { DatePickerInput } from "@/shared/components/Form/DatePickerInput";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";

import { CustomerDocument } from "../DataFormDocuments";

const documentSchema = z.object({
  name: z.string().trim().min(1, "O nome do documento é obrigatório."),
  issueDate: z.string().optional(),
  expirationDate: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
});

export type DocumentSchema = z.infer<typeof documentSchema>;

const DocumentPlaceholder = () => (
  <IoDocumentAttachOutline size={40} className="text-primary group-hover:text-primary/80" />
);

interface AddDocumentProps {
  addDocument: (doc?: CustomerDocument) => void;
}

function AddDocument({ addDocument }: AddDocumentProps) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: { expirationDate: undefined, files: [], issueDate: undefined, name: "" },
  });

  const { setValue, watch, handleSubmit, control, reset } = form;

  const files = watch("files") ?? [];

  const handleFileChange = (newFiles: File[] | null) => {
    if (newFiles) {
      const filesArray = Array.from(newFiles);
      setValue("files", [...(files || []), ...filesArray]);
    }
  };

  const handleFileDelete = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setValue("files", updatedFiles);
  };

  const onSubmit = (data: DocumentSchema) => {
    addDocument({
      name: data.name,
      expirationDate: data.expirationDate?.toString(),
      issueDate: data.issueDate?.toString(),
      files: data.files,
    });
    setOpen(false);
    reset();
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Novo documento
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogDescription />
          <AlertDialogHeader className="mb-3">
            <AlertDialogTitle>Adicionar documento do cliente</AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start">
                    <FormLabel>Nome do documento</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do documento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center gap-2">
                <FormField
                  control={control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col justify-start">
                      <FormLabel>Data de expedição</FormLabel>
                      <FormControl>
                        <DatePickerInput
                          value={field.value ? new Date(field.value) : undefined}
                          onChange={(date) => {
                            field.onChange(date ? date.toISOString() : null);
                          }}
                          placeholder="Data de expedição"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col justify-start">
                      <FormLabel>Data de validade</FormLabel>
                      <FormControl>
                        <DatePickerInput
                          value={field.value ? new Date(field.value) : undefined}
                          onChange={(date) => {
                            field.onChange(date ? date.toISOString() : null);
                          }}
                          placeholder="Data de validade"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-5 mb-5 flex flex-wrap gap-3">
                <MultipleImageUpload
                  inputClassName="w-16 h-16 rounded-md"
                  ImagePickerPlaceholder={DocumentPlaceholder}
                  onChange={handleFileChange}
                  currentFilesLength={files.length}
                  max={5}
                  accept="*"
                />
                {files.map((file, index) => (
                  <FilePreview
                    currentFile={file}
                    key={index}
                    onDelete={() => handleFileDelete(index)}
                    className="border-primary bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-md border"
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>

                <Button type="button" onClick={handleSubmit(onSubmit)} className="flex-1">
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AddDocument;
