import { cn } from "@/shared/lib/utils";
import React, { memo } from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface ImagePreviewProps {
  currentImage: File | string | null | undefined;
  onDelete: () => void;
  className?: string;
  imgClassName?: string;
}

function ImagePreview({ currentImage, onDelete, className, imgClassName }: ImagePreviewProps) {
  const imageUrl =
    currentImage instanceof File
      ? URL.createObjectURL(currentImage)
      : typeof currentImage === "string"
        ? currentImage
        : null;

  return (
    <div className={cn("relative", className)}>
      {imageUrl && <img src={imageUrl} alt="Preview" className={cn("h-full w-full object-cover", imgClassName)} />}
      {imageUrl && (
        <button
          onClick={onDelete}
          type="button"
          className={
            "absolute -right-1 -bottom-1 flex items-center justify-center rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
          }
        >
          <HiOutlineTrash size={15} />
        </button>
      )}
    </div>
  );
}

export default memo(ImagePreview);
