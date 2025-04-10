import { CreateCustomerDocumentRequest, CustomerDocumentService } from "@/shared/services/entities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface CreateCustomerDocumentMutationProps {
  onSuccess?: () => void;
  onError?: (error: AxiosError | Error) => void;
}

interface UpdateCustomerDocumentMutationProps {
  onSuccess?: () => void;
  onError?: (error: AxiosError | Error) => void;
}

interface DeleteCustomerDocumentMutationProps {
  onSuccess?: () => void;
  onError?: (error: AxiosError | Error) => void;
}

export function useCreateCustomerDocumentMutation({ onSuccess, onError }: CreateCustomerDocumentMutationProps) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, CreateCustomerDocumentRequest>({
    mutationFn: CustomerDocumentService.createCustomerDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-documents"] });
      onSuccess?.();
    },
    onError,
  });
}

export function useUpdateCustomerDocumentMutation({ onSuccess, onError }: UpdateCustomerDocumentMutationProps) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: string; data: Partial<CreateCustomerDocumentRequest> }>({
    mutationFn: ({ id, data }) => CustomerDocumentService.updateCustomerDocument(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-documents"] });
      onSuccess?.();
    },
    onError,
  });
}

export function useDeleteCustomerDocumentMutation({ onSuccess, onError }: DeleteCustomerDocumentMutationProps) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: CustomerDocumentService.deleteCustomerDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-documents"] });
      onSuccess?.();
    },
    onError,
  });
}
