import { cn } from "@/shared/lib/utils";
import React, { ElementType } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface MultipleImageUploadProps {
  onChange: (file: File[] | null) => void;
  ImagePickerPlaceholder?: ElementType;
  isPending?: boolean;
  errorMessage?: string;
  inputClassName?: string;
  max?: number;
  currentImagesLength: number;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  onChange,
  ImagePickerPlaceholder,
  isPending = false,
  errorMessage,
  inputClassName,
  max,
  currentImagesLength,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isPending) return;

    const files = event.target.files ? Array.from(event.target.files) : [];

    if (max && currentImagesLength + files.length > max) {
      const allowedFiles = files.slice(0, max - currentImagesLength);
      toast("Limite de imagens atingido.");
      onChange(allowedFiles);
    } else {
      onChange(files);
    }

    event.target.value = "";
  };

  const id = uuidv4();

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "border-primary hover:border-primary/80 group flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-full border-3 border-dashed",
          inputClassName,
          {
            "cursor-not-allowed opacity-50": isPending,
          },
        )}
      >
        {ImagePickerPlaceholder ? (
          <ImagePickerPlaceholder />
        ) : (
          <span className="text-sm text-gray-500">Clique para enviar</span>
        )}
        <input
          id={id}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isPending}
        />
      </label>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default MultipleImageUpload;
