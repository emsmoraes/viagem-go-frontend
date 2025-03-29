import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type CreateProposalDestinationRequest = {
  name: string;
  proposalId: string;
  description?: string;
  departureDate?: string;
  returnDate?: string;
  images?: File[];
};

export type UpdateProposalDestinationRequest = {
  name: string;
  description?: string;
  departureDate?: string;
  returnDate?: string;
  existingImages?: string[];
  images?: File[];
};

const createProposalDestination = async (data: CreateProposalDestinationRequest): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    data.departureDate && formData.append("departureDate", data.departureDate);
    data.returnDate && formData.append("returnDate", data.returnDate);
    formData.append("proposalId", data.proposalId);

    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) => {
        formData.append("images", image);
      });
    }

    await api.post("proposal-destination", formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const updateProposalDestination = async (id: string, data: UpdateProposalDestinationRequest): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.departureDate) {
      formData.append("departureDate", data.departureDate);
    }

    if (data.returnDate) {
      formData.append("returnDate", data.returnDate);
    }

    if (data.existingImages && data.existingImages.length > 0) {
      data.existingImages.forEach((image) => {
        formData.append("existingImages", image);
      });
    }

    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    await api.patch(`proposal-destination/${id}`, formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const deleteProposalDestination = async (id: string): Promise<void> => {
  try {
    await api.delete(`proposal-destination/${id}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const DestinationService = {
  createProposalDestination,
  updateProposalDestination,
  deleteProposalDestination,
};
