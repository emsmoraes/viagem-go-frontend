import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type CreateAccommodationRequest = {
  name: string;
  location?: string;
  address?: string;
  checkIn?: string;
  checkOut?: string;
  category?: string;
  boardType?: string;
  roomType?: string;
  description?: string;
  price?: number;
  proposalId: string;
  images?: File[] | null;
  files?: File[] | null;
};

export type UpdateAccommodationRequest = Partial<CreateAccommodationRequest> & {
  imageUrls?: string[];
  fileUrls?: string[];
};

const createAccommodation = async (data: CreateAccommodationRequest): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("proposalId", data.proposalId);
    
    if (data.location) {
      formData.append("location", data.location);
    }
    
    if (data.address) {
      formData.append("address", data.address);
    }
    
    if (data.checkIn) {
      formData.append("checkIn", data.checkIn);
    }
    
    if (data.checkOut) {
      formData.append("checkOut", data.checkOut);
    }
    
    if (data.category) {
      formData.append("category", data.category);
    }
    
    if (data.boardType) {
      formData.append("boardType", data.boardType);
    }
    
    if (data.roomType) {
      formData.append("roomType", data.roomType);
    }
    
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

    await api.post("accommodations", formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const updateAccommodation = async (accommodationId: string, proposalId: string, data: UpdateAccommodationRequest): Promise<void> => {
  try {
    const formData = new FormData();

    if (data.name) {
      formData.append("name", data.name);
    }
    
    if (data.location) {
      formData.append("location", data.location);
    }
    
    if (data.address) {
      formData.append("address", data.address);
    }
    
    if (data.checkIn) {
      formData.append("checkIn", data.checkIn);
    }
    
    if (data.checkOut) {
      formData.append("checkOut", data.checkOut);
    }
    
    if (data.category) {
      formData.append("category", data.category);
    }
    
    if (data.boardType) {
      formData.append("boardType", data.boardType);
    }
    
    if (data.roomType) {
      formData.append("roomType", data.roomType);
    }
    
    if (data.description) {
      formData.append("description", data.description);
    }
    
    if (data.price !== undefined) {
      formData.append("price", data.price.toString());
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

    await api.patch(`accommodations/${accommodationId}/proposal/${proposalId}`, formData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const deleteAccommodation = async (accommodationId: string, proposalId: string): Promise<void> => {
  try {
    await api.delete(`accommodations/${accommodationId}/proposal/${proposalId}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const AccommodationService = {
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
};