import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type CreateFlightRequest = {
  proposalId: string;
  origin: string;
  destination: string;
  type: string;
  baggagePerPerson?: number;
  duration?: string;
  price?: number;
  arrivalAt?: string;
  departureAt?: string;
  observation?: string;
  images?: File[] | null;
  files?: File[] | null;
};

export type UpdateFlightRequest = {
  origin: string;
  destination: string;
  type: string;
  baggagePerPerson?: number;
  duration?: string;
  price?: number;
  arrivalAt?: string;
  departureAt?: string;
  observation?: string;
  images?: File[];
  files?: File[];
  imageUrls?: string[];
  fileUrls?: string[];
};

const createFlight = async (data: CreateFlightRequest): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append("proposalId", data.proposalId);
    formData.append("origin", data.origin);
    formData.append("destination", data.destination);
    formData.append("type", data.type);

    if (data.baggagePerPerson !== undefined) {
      formData.append("baggagePerPerson", data.baggagePerPerson.toString());
    }

    if (data.duration) {
      formData.append("duration", data.duration);
    }

    if (data.price !== undefined) {
      formData.append("price", data.price.toString());
    }

    if (data.arrivalAt) {
      formData.append("arrivalAt", data.arrivalAt);
    }

    if (data.departureAt) {
      formData.append("departureAt", data.departureAt);
    }

    if (data.observation) {
      formData.append("observation", data.observation);
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

    await api.post("tickets", formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const updateFlight = async (ticketId: string, proposalId: string, data: UpdateFlightRequest): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append("origin", data.origin);
    formData.append("destination", data.destination);
    formData.append("type", data.type);

    if (data.baggagePerPerson !== undefined) {
      formData.append("baggagePerPerson", data.baggagePerPerson.toString());
    }

    if (data.duration) {
      formData.append("duration", data.duration);
    }

    if (data.price !== undefined) {
      formData.append("price", data.price.toString());
    }

    if (data.arrivalAt) {
      formData.append("arrivalAt", data.arrivalAt);
    }

    if (data.departureAt) {
      formData.append("departureAt", data.departureAt);
    }

    if (data.observation) {
      formData.append("observation", data.observation);
    }

    if (data.imageUrls && data.imageUrls.length > 0) {
      data.imageUrls.forEach((imageUrl) => {
        formData.append("imageUrls[]", imageUrl);
      });
    }

    if (data.fileUrls && data.fileUrls.length > 0) {
      data.fileUrls.forEach((fileUrl) => {
        formData.append("fileUrls[]", fileUrl);
      });
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

    await api.patch(`tickets/${ticketId}/proposal/${proposalId}`, formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const deleteFlight = async (ticketId: string, proposalId: string): Promise<void> => {
  try {
    await api.delete(`tickets/${ticketId}/proposal/${proposalId}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const FlightService = {
  createFlight,
  updateFlight,
  deleteFlight,
};
