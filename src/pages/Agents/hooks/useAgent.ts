import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { AgentService, CreateAgentRequest } from "@/shared/services/entities/agent-service/AgentService";
import { Agent } from "@/shared/models/agent.model";

interface UseCreateAgentMutationResult {
  isLoadingCreateAgent: boolean;
  createAgent: (data: CreateAgentRequest) => void;
  response?: Agent;
}

interface Props {
  onSuccess: (data: Agent) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useCreateAgentMutation({ onSuccess, onError }: Props): UseCreateAgentMutationResult {
  const { mutate, isPending, data } = useMutation<Agent, Error | AxiosError, CreateAgentRequest>({
    mutationFn: AgentService.createAgent,
    onSuccess,
    onError,
  });

  return {
    isLoadingCreateAgent: isPending,
    createAgent: mutate,
    response: data,
  };
}
