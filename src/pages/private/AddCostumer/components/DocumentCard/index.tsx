import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { CustomerDocument } from "../DataFormDocuments";
import { format } from "date-fns";
import { FaFileAlt, FaTrashAlt, FaEdit } from "react-icons/fa";
import EditDocument from "../EditDocument";
import FilePreview from "@/shared/components/FilePreview";

interface DocumentCardProps {
  document: CustomerDocument;
  onDelete?: () => void;
  index: number;
  editDocument: (index: number, updatedDoc: Partial<CustomerDocument>) => void;
  removeDocument: (index: number) => void;
}

function DocumentCard({ document, editDocument, onDelete, index, removeDocument }: DocumentCardProps) {
  const { name, issueDate, expirationDate, files } = document;

  const formatDate = (date?: string) => {
    if (!date) return "—";
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? "Data inválida" : format(parsedDate, "dd/MM/yyyy");
  };

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <div className="flex gap-2">
          <EditDocument
            defaultValues={{
              name: document.name,
              expirationDate: document.expirationDate ? new Date(document.expirationDate) : undefined,
              files: document.files,
              issueDate: document.issueDate ? new Date(document.issueDate) : undefined,
            }}
            editDocument={editDocument}
            index={index}
          />
          <Button type="button" variant="ghost" size="icon" onClick={() => removeDocument(index)}>
            <FaTrashAlt className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="text-muted-foreground text-sm">
          <strong>Data de expedição:</strong> {formatDate(issueDate)}
        </div>
        <div className="text-muted-foreground text-sm">
          <strong>Data de validade:</strong> {formatDate(expirationDate)}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {files && files.length > 0 ? (
            files.map((file, index) => (
              <div key={index}>
                <FilePreview
                  currentFile={file}
                  key={index}
                  className="border-primary bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-md border"
                />
                <span className="text-sm">{file.name || `Arquivo ${index + 1}`}</span>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground text-sm">Nenhum arquivo anexado.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default DocumentCard;
