import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { Customer } from "@/shared/models/customer.model";

interface GetProposalsResponse {
  data: Customer[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface CreateCustomerRequest {
  fullName: string;
  nickname?: string;
  rg?: string;
  cpf?: string;
  birthDate?: string;
  email?: string;
  phone?: string;
  maritalStatus?: string;
  profession?: string;
  numberOfChildren?: number;
  postalCode?: string;
  address?: string;
  addressNumber?: string;
  neighborhood?: string;
  complement?: string;
  city?: string;
  state?: string;
  country?: string;
  family?: string[];
  accommodationPreference?: string[];
  airPreference?: string[];
  travelStyle?: string[];
  interestedExperiences?: string[];
  dreamTrips?: string[];
  recentTrips?: string[];
  tags?: string[];
  observation?: string;
  referralSource?: string;
  image?: File | null;
}

const getAllCustomers = async (search: string = "", page: number = 1): Promise<GetProposalsResponse> => {
  try {
    const { data } = await api.get<GetProposalsResponse>("/customers", {
      params: { search, page },
    });

    return data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao listar clientes");
  }
};

const getCustomerById = async (id: string): Promise<Customer> => {
  try {
    const { data } = await api.get(`/customers/${id}`);
    return data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao buscar cliente");
  }
};

const createCustomer = async (data: CreateCustomerRequest): Promise<{ costumerId: string }> => {
  try {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    if (data.nickname) formData.append("nickname", data.nickname);
    if (data.rg) formData.append("rg", data.rg);
    if (data.cpf) formData.append("cpf", data.cpf);
    if (data.birthDate) formData.append("birthDate", data.birthDate);
    if (data.email) formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    if (data.maritalStatus) formData.append("maritalStatus", data.maritalStatus);
    if (data.profession) formData.append("profession", data.profession);
    if (data.numberOfChildren !== undefined) formData.append("numberOfChildren", data.numberOfChildren.toString());
    if (data.postalCode) formData.append("postalCode", data.postalCode);
    if (data.address) formData.append("address", data.address);
    if (data.addressNumber) formData.append("addressNumber", data.addressNumber);
    if (data.neighborhood) formData.append("neighborhood", data.neighborhood);
    if (data.complement) formData.append("complement", data.complement);
    if (data.city) formData.append("city", data.city);
    if (data.state) formData.append("state", data.state);
    if (data.country) formData.append("country", data.country);
    if (data.observation) formData.append("observation", data.observation);
    if (data.referralSource) formData.append("referralSource", data.referralSource);

    // Arrays
    const arrayFields: (keyof CreateCustomerRequest)[] = [
      "family",
      "accommodationPreference",
      "airPreference",
      "travelStyle",
      "interestedExperiences",
      "dreamTrips",
      "recentTrips",
      "tags",
    ];

    arrayFields.forEach((key) => {
      const arr = data[key];
      if (arr && Array.isArray(arr)) {
        arr.forEach((item) => formData.append(`${key}[]`, item));
      }
    });

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await api.post<{ costumerId: string }>("/customers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const updateCustomer = async (customerId: string, data: CreateCustomerRequest): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    if (data.nickname) formData.append("nickname", data.nickname);
    if (data.rg) formData.append("rg", data.rg);
    if (data.cpf) formData.append("cpf", data.cpf);
    if (data.birthDate) formData.append("birthDate", data.birthDate);
    if (data.email) formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    if (data.maritalStatus) formData.append("maritalStatus", data.maritalStatus);
    if (data.profession) formData.append("profession", data.profession);
    if (data.numberOfChildren !== undefined) formData.append("numberOfChildren", data.numberOfChildren.toString());
    if (data.postalCode) formData.append("postalCode", data.postalCode);
    if (data.address) formData.append("address", data.address);
    if (data.addressNumber) formData.append("addressNumber", data.addressNumber);
    if (data.neighborhood) formData.append("neighborhood", data.neighborhood);
    if (data.complement) formData.append("complement", data.complement);
    if (data.city) formData.append("city", data.city);
    if (data.state) formData.append("state", data.state);
    if (data.country) formData.append("country", data.country);
    if (data.observation) formData.append("observation", data.observation);
    if (data.referralSource) formData.append("referralSource", data.referralSource);

    const arrayFields: (keyof CreateCustomerRequest)[] = [
      "family",
      "accommodationPreference",
      "airPreference",
      "travelStyle",
      "interestedExperiences",
      "dreamTrips",
      "recentTrips",
      "tags",
    ];

    arrayFields.forEach((key) => {
      const arr = data[key];
      if (arr && Array.isArray(arr)) {
        arr.forEach((item) => formData.append(`${key}[]`, item));
      }
    });

    if (data.image) {
      formData.append("image", data.image);
    }

    await api.put(`/customers/${customerId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const deleteCustomer = async (id: string): Promise<void> => {
  try {
    await api.delete(`/customers/${id}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao deletar cliente");
  }
};

export const CustomerService = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  getCustomerById,
  deleteCustomer,
};
