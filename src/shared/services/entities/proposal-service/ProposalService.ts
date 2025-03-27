import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { Proposal } from "@/shared/models/proposal.model";

interface GetProposalsResponse {
  proposals: Proposal[];
  total: number;
  currentPage: number;
  totalPages: number;
}

interface CreateProposalRequest {
  title: string;
}

interface CreateProposalPassengerRequest {
  name: string;
  proposalId: string;
  PassengerId?: string;
}

type GetProposalByIdResponse = Pick<
  Proposal,
  "id" | "title" | "coverUrl" | "status" | "departureDate" | "returnDate" | "userId" | "createdAt" | "updatedAt"
>;

export interface UpdateProposalRequest {
  title?: string;
  status?: string;
  departureDate?: string;
  returnDate?: string;
  cover?: File;
}

export interface CreateProposalResponse extends Proposal {}

const getProposals = async (search: string, page: number = 1): Promise<GetProposalsResponse> => {
  try {
    const { data } = await api.get<GetProposalsResponse>("proposal", {
      params: { search, page },
    });

    return data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const getProposalById = async (proposalId: string): Promise<GetProposalByIdResponse> => {
  try {
    const { data } = await api.get<GetProposalByIdResponse>(`proposal/${proposalId}`);
    return data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const createProposal = async (proposal: CreateProposalRequest): Promise<CreateProposalResponse> => {
  try {
    const { data } = await api.post<CreateProposalResponse>("proposal", proposal);
    return data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const updateProposal = async (proposalId: string, updateData: UpdateProposalRequest): Promise<void> => {
  try {
    const formData = new FormData();

    if (updateData.title) formData.append("title", updateData.title);
    if (updateData.status) formData.append("status", updateData.status);
    if (updateData.departureDate) formData.append("departureDate", updateData.departureDate);
    if (updateData.returnDate) formData.append("returnDate", updateData.returnDate);
    if (updateData.cover) formData.append("cover", updateData.cover);

    await api.patch<GetProposalByIdResponse>(`proposal/${proposalId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const deleteProposalById = async (proposalId: string): Promise<void> => {
  try {
    await api.delete(`proposal/${proposalId}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const ProposalService = {
  getProposals,
  createProposal,
  deleteProposalById,
  getProposalById,
  updateProposal,
};
