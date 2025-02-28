import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { Agent } from "@/shared/models/agent.model";

export type CreateAgentRequest = Pick<Agent, "name" | "type" | "isActive" | "templateId"> & {
  description: string;
};

const createAgent = async (data: CreateAgentRequest): Promise<Agent> => {
  try {
    const { data: agent } = await api.post<Agent>("agents", data);
    return agent;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const AgentService = {
  createAgent,
};
