import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type CreateCruiseRequest = {
  name: string;
  cabin?: string;
  checkIn?: string;
  checkOut?: string;
  route?: string;
  description?: string;
  price?: number;
  paymentMethods?: string;
  proposalId: string;
  images?: File[] | null;
  files?: File[] | null;
};

export type UpdateCruiseRequest = {
  name?: string;
  cabin?: string;
  checkIn?: string;
  checkOut?: string;
  route?: string;
  description?: string;
  price?: number;
  paymentMethods?: string;
  images?: File[];
  files?: File[];
  imageUrls?: string[];
  fileUrls?: string[];
};

const createCruise = async (data: CreateCruiseRequest): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("proposalId", data.proposalId);

    if (data.cabin) {
      formData.append("cabin", data.cabin);
    }

    if (data.checkIn) {
      formData.append("checkIn", data.checkIn);
    }

    if (data.checkOut) {
      formData.append("checkOut", data.checkOut);
    }

    if (data.route) {
      formData.append("route", data.route);
    }

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.price !== undefined) {
      formData.append("price", data.price.toString());
    }

    if (data.paymentMethods) {
      formData.append("paymentMethods", data.paymentMethods);
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

    await api.post("cruises", formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao criar cruzeiro");
  }
};

const updateCruise = async (cruiseId: string, proposalId: string, data: UpdateCruiseRequest): Promise<void> => {
  try {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.cabin) formData.append("cabin", data.cabin);
    if (data.checkIn) formData.append("checkIn", data.checkIn);
    if (data.checkOut) formData.append("checkOut", data.checkOut);
    if (data.route) formData.append("route", data.route);
    if (data.description) formData.append("description", data.description);
    if (data.price !== undefined) formData.append("price", data.price.toString());
    if (data.paymentMethods) formData.append("paymentMethods", data.paymentMethods);

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

    await api.patch(`cruises/${cruiseId}/proposal/${proposalId}`, formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao atualizar cruzeiro");
  }
};

const deleteCruise = async (cruiseId: string, proposalId: string): Promise<void> => {
  try {
    await api.delete(`cruises/${cruiseId}/proposal/${proposalId}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao deletar cruzeiro");
  }
};

export const CruiseService = {
  createCruise,
  updateCruise,
  deleteCruise,
};
