import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type CreateProposalDayByDayRequest = {
  title: string;
  proposalId: string;
  description?: string;
  departureDate?: string;
  returnDate?: string;
  images?: File[];
};

export type UpdateProposalDayByDayRequest = {
  title: string;
  description?: string;
  departureDate?: string;
  returnDate?: string;
  existingImages?: string[];
  images?: File[];
};

const createProposalDayByDay = async (data: CreateProposalDayByDayRequest): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    data.departureDate && formData.append("departureDate", data.departureDate);
    data.returnDate && formData.append("returnDate", data.returnDate);
    formData.append("proposalId", data.proposalId);

    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    await api.post("proposal-day-by-day", formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const updateProposalDayByDay = async (id: string, data: UpdateProposalDayByDayRequest): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append("title", data.title);

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
        formData.append("existingImages[]", image);
      });
    }

    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    await api.patch(`proposal-day-by-day/${id}`, formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const deleteProposalDayByDay = async (id: string): Promise<void> => {
  try {
    await api.delete(`proposal-day-by-day/${id}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const DayByDayService = {
  createProposalDayByDay,
  updateProposalDayByDay,
  deleteProposalDayByDay,
};
