import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type CreateExtraRequest = {
  title: string;
  description?: string;
  price?: number;
  proposalId: string;
  images?: File[];
  files?: File[];
};

export type UpdateExtraRequest = {
  title?: string;
  description?: string;
  price?: number;
  images?: File[];
  files?: File[];
  imageUrls?: string[];
  fileUrls?: string[];
};

const createExtra = async (data: CreateExtraRequest): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("proposalId", data.proposalId);

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.price !== undefined) {
      formData.append("price", data.price.toString());
    }

    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    await api.post("extras", formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao criar extra");
  }
};

const updateExtra = async (extraId: string, proposalId: string, data: UpdateExtraRequest): Promise<void> => {
  try {
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.price !== undefined) formData.append("price", data.price.toString());

    if (data.imageUrls && data.imageUrls.length > 0) {
      data.imageUrls.forEach((url) => {
        formData.append("imageUrls[]", url);
      });
    }

    if (data.fileUrls && data.fileUrls.length > 0) {
      data.fileUrls.forEach((url) => {
        formData.append("fileUrls[]", url);
      });
    }

    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    await api.patch(`extras/${extraId}/proposal/${proposalId}`, formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao atualizar extra");
  }
};

const deleteExtra = async (extraId: string, proposalId: string): Promise<void> => {
  try {
    await api.delete(`extras/${extraId}/proposal/${proposalId}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao deletar extra");
  }
};

export const ExtraService = {
  createExtra,
  updateExtra,
  deleteExtra,
};
