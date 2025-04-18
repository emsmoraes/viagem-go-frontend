import React, { useState, useEffect, ElementType } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";

interface SingleImageUploadProps {
  currentImage?: File | string | null;
  onChange?: (file: File | null) => void;
  ImagePickerPlaceholder?: ElementType;
  isPending?: boolean;
  errorMessage?: string;
  hiddenDelete?: boolean;
  disabled?: boolean;
  className?: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  currentImage,
  onChange,
  ImagePickerPlaceholder,
  isPending = false,
  errorMessage,
  hiddenDelete = false,
  className,
  disabled,
}) => {
  const imageUrl =
    currentImage instanceof File
      ? URL.createObjectURL(currentImage)
      : typeof currentImage === "string"
        ? currentImage + "?" + new Date().getTime()
        : null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isPending || disabled) return;
    const file = event.target.files?.[0] || null;
    event.target.value = "";
    onChange?.(file);
  };

  const handleDelete = () => {
    if (isPending) return;
    onChange?.(null);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {imageUrl ? (
        <div className="relative rounded-full">
          <label htmlFor={disabled ? "" : "file-input"} className={!disabled ? "cursor-pointer" : ""}>
            <img
              src={imageUrl}
              alt="Preview"
              className={cn("h-40 w-40 rounded-full object-cover shadow-md", className)}
            />
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isPending || disabled}
          />

          <Dialog>
            {!hiddenDelete && (
              <DialogTrigger asChild>
                <button
                  type="button"
                  disabled={isPending}
                  className={`absolute right-3 bottom-1 flex items-center justify-center rounded-full p-1 shadow-md ${
                    isPending ? "cursor-not-allowed bg-gray-400" : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  <HiOutlineTrash size={22} />
                </button>
              </DialogTrigger>
            )}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja excluir esta imagem? Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isPending}>
                    Cancelar
                  </Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
                  Excluir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <label
          htmlFor={!disabled ? "file-input" : ""}
          className={cn(
            "border-primary hover:border-primary/80 group flex h-40 w-40 flex-col items-center justify-center rounded-full border-3 border-dashed",
            className,
            {
              "cursor-not-allowed opacity-50": disabled || isPending,
              "cursor-pointer": !disabled && !isPending,
            },
          )}
        >
          {ImagePickerPlaceholder ? (
            <ImagePickerPlaceholder />
          ) : (
            <span className="text-sm text-gray-500">Clique para enviar</span>
          )}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled || isPending}
          />
        </label>
      )}
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default SingleImageUpload;
