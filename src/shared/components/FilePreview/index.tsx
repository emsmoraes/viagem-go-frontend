import { memo } from "react";
import { FaFile, FaFilePdf, FaFileImage, FaFileAudio, FaFileVideo, FaFileCode, FaFileArchive } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

interface FilePreviewProps {
  currentFile: File | string | null | undefined;
  className?: string;
  onDelete: () => void; // Função de exclusão
}

function FilePreview({ currentFile, className, onDelete }: FilePreviewProps) {
  const getFileExtension = (file: File | string | null | undefined): string | null => {
    if (file instanceof File) {
      return file.name.split(".").pop()?.toLowerCase() ?? null;
    }
    if (typeof file === "string") {
      return file.split(".").pop()?.toLowerCase() ?? null;
    }
    return null;
  };

  const fileExtension = getFileExtension(currentFile);

  const renderIcon = () => {
    switch (fileExtension) {
      case "pdf":
        return <FaFilePdf size={50} />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage size={50} />;
      case "mp3":
      case "wav":
        return <FaFileAudio size={50} />;
      case "mp4":
      case "mkv":
        return <FaFileVideo size={50} />;
      case "html":
      case "css":
      case "js":
        return <FaFileCode size={50} />;
      case "zip":
      case "rar":
        return <FaFileArchive size={50} />;
      default:
        return <FaFile size={50} />;
    }
  };

  return (
    <div className={className} style={{ position: "relative" }}>
      {renderIcon()}
      {currentFile && (
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

export default memo(FilePreview);
