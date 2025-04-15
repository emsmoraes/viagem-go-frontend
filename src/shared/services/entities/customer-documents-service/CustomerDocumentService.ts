import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export interface CreateCustomerDocumentRequest {
  customerId: string;
  documents: {
    name: string;
    issueDate?: string;
    expirationDate?: string;
    files?: File[];
  }[];
}

interface UpdateCustomerDocumentRequest {
  name?: string;
  customerId?: string;
  issueDate?: string;
  expirationDate?: string;
  existingDocumentUrls?: string[];
  documents?: File[];
}

const createCustomerDocument = async (data: CreateCustomerDocumentRequest): Promise<void> => {
  const formData = new FormData();

  formData.append("customerId", data.customerId);

  data.documents.forEach((document, index) => {
    formData.append(`documents[${index}][name]`, document.name);

    if (document.issueDate) {
      formData.append(`documents[${index}][issueDate]`, document.issueDate);
    }

    if (document.expirationDate) {
      formData.append(`documents[${index}][expirationDate]`, document.expirationDate);
    }

    document.files &&
      document.files.forEach((file, fileIndex) => {
        formData.append(`documents[${index}][files][${fileIndex}]`, file);
      });
  });

  try {
    await api.post("/customer-document", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateCustomerDocument = async (id: string, data: UpdateCustomerDocumentRequest): Promise<void> => {
  try {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.customerId) formData.append("customerId", data.customerId);
    if (data.issueDate) formData.append("issueDate", data.issueDate);
    if (data.expirationDate) formData.append("expirationDate", data.expirationDate);

    if (data.existingDocumentUrls && data.existingDocumentUrls.length > 0) {
      data.existingDocumentUrls.forEach((url) => {
        formData.append("existingDocumentUrls", url);
      });
    }

    if (data.documents && data.documents.length > 0) {
      data.documents.forEach((file) => {
        formData.append("documents", file);
      });
    }

    await api.patch(`/customer-document/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao atualizar documento do cliente");
  }
};

export const deleteCustomerDocument = async (id: string): Promise<void> => {
  try {
    await api.delete(`/customer-document/${id}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao deletar documento do cliente");
  }
};

export const CustomerDocumentService = {
  createCustomerDocument,
  updateCustomerDocument,
  deleteCustomerDocument,
};
