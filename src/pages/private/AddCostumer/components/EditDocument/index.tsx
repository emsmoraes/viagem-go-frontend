import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { FaEdit } from "react-icons/fa";
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

interface EditDocumentProps {
  index: number;
  editDocument: (index: number, updatedDoc: Partial<CustomerDocument>) => void;
  defaultValues: DocumentSchema;
}

function EditDocument({ index, editDocument, defaultValues }: EditDocumentProps) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues,
  });

  const { setValue, watch, handleSubmit, control, reset } = form;
  const files = watch("files") ?? [];

  const handleFileChange = (newFiles: File[] | null) => {
    if (newFiles) {
      const filesArray = Array.from(newFiles);
      setValue("files", [...(files || []), ...filesArray]);
    }
  };

  const handleFileDelete = (fileIndex: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(fileIndex, 1);
    setValue("files", updatedFiles);
  };

  const onSubmit = (data: DocumentSchema) => {
    editDocument(index, {
      name: data.name,
      issueDate: data.issueDate?.toString(),
      expirationDate: data.expirationDate?.toString(),
      files: data.files,
    });
    setOpen(false);
  };

  return (
    <>
      <Button type="button" variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <FaEdit className="h-4 w-4" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogDescription />
          <AlertDialogHeader className="mb-3">
            <AlertDialogTitle>Editar documento do cliente</AlertDialogTitle>
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
                {files.map((file, idx) => (
                  <FilePreview
                    key={idx}
                    currentFile={file}
                    onDelete={() => handleFileDelete(idx)}
                    className="border-primary bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-md border"
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>
                <Button type="button" className="flex-1" onClick={handleSubmit(onSubmit)}>
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

export default EditDocument;
