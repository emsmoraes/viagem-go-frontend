import { FormLabel } from "@/shared/components/ui/form";
import { useFieldArray, useFormContext, Control, UseFormWatch } from "react-hook-form";
import AddDocument from "../AddDocument";
import DocumentCard from "../DocumentCard";

export interface CustomerDocument {
  name: string;
  issueDate?: string;
  expirationDate?: string;
  files?: File[];
}

interface DataFormDocumentsProps {
  control: Control<any>;
  name: string;
  watch: UseFormWatch<any>;
}

function DataFormDocuments({ control, name, watch }: DataFormDocumentsProps) {
  const { fields, append, update, remove } = useFieldArray({
    control,
    name,
  });

  const documents = watch("customerDocuments");

  const addDocument = (doc?: CustomerDocument) => {
    append({
      name: doc?.name ?? "",
      issueDate: doc?.issueDate ?? "",
      expirationDate: doc?.expirationDate ?? "",
      files: doc?.files ?? [],
    });
  };

  const editDocument = (index: number, updatedDoc: Partial<CustomerDocument>) => {
    const current = fields[index];
    update(index, { ...current, ...updatedDoc });
  };

  const removeDocument = (index: number) => {
    remove(index);
  };

  return (
    <>
      <FormLabel>Documentos</FormLabel>
      <AddDocument addDocument={addDocument} />

      <div className="flex flex-wrap gap-2">
        {documents?.map((doc: any, index: number) => (
          <DocumentCard removeDocument={removeDocument} editDocument={editDocument} index={index} document={doc} key={index}/>
        ))}
      </div>
    </>
  );
}

export default DataFormDocuments;
