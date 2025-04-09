import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type CreateSummaryRequest = {
  includedInProposal: string;
  totalValue?: number;
  conditionsAndValidity?: string;
  proposalId: string;
};

export type UpdateSummaryRequest = {
  includedInProposal?: string;
  totalValue?: number;
  conditionsAndValidity?: string;
};

const createSummary = async (data: CreateSummaryRequest): Promise<void> => {
  try {
    await api.post("summaries", data);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao criar resumo da proposta");
  }
};

const updateSummary = async (summaryId: string, proposalId: string, data: UpdateSummaryRequest): Promise<void> => {
  try {
    const payload = {
      ...data,
      totalValue: data.totalValue !== undefined ? String(data.totalValue) : undefined,
    };

    await api.patch(`summaries/${summaryId}/proposal/${proposalId}`, payload);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao atualizar resumo da proposta");
  }
};

const deleteSummary = async (summaryId: string, proposalId: string): Promise<void> => {
  try {
    await api.delete(`summaries/${summaryId}/proposal/${proposalId}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro ao deletar resumo da proposta");
  }
};

export const SummaryService = {
  createSummary,
  updateSummary,
  deleteSummary,
};
