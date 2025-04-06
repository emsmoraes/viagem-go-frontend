import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type CreateTransportRequest = {
  type: string;
  description?: string;
  price?: number;
  proposalId: string;
  images?: File[];
  files?: File[];
};

export type UpdateTransportRequest = {
  type?: string;
  description?: string;
  price?: number;
  images?: File[];
  files?: File[];
  imageUrls?: string[];
  fileUrls?: string[];
};

const createTransport = async (data: CreateTransportRequest): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append("type", data.type);
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

    await api.post("transports", formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao criar transporte");
  }
};

const updateTransport = async (
  transportId: string,
  proposalId: string,
  data: UpdateTransportRequest,
): Promise<void> => {
  try {
    const formData = new FormData();

    if (data.type) formData.append("type", data.type);
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

    await api.patch(`transports/${transportId}/proposal/${proposalId}`, formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao atualizar transporte");
  }
};

const deleteTransport = async (transportId: string, proposalId: string): Promise<void> => {
  try {
    await api.delete(`transports/${transportId}/proposal/${proposalId}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao deletar transporte");
  }
};

export const TransportService = {
  createTransport,
  updateTransport,
  deleteTransport,
};
