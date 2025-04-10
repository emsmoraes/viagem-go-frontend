import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Customer } from "@/shared/models/customer.model";
import type { AxiosError } from "axios";
import { CreateCustomerRequest, CustomerService } from "@/shared/services/entities";

interface UseCustomersQueryProps {
  search: string;
  page: number;
}

interface UseCustomersQueryResult {
  customers: Customer[];
  total: number;
  currentPage: number;
  totalPages: number;
  isLoadingCustomers: boolean;
  isErrorCustomers: boolean;
  errorCustomers: AxiosError | Error | null;
}

interface CreateCustomerMutationProps {
  onSuccess?: () => void;
  onError?: (error: AxiosError | Error) => void;
}

interface UpdateCustomerMutationProps {
  onSuccess?: () => void;
  onError?: (error: AxiosError | Error) => void;
}

interface DeleteCustomerMutationProps {
  onSuccess?: () => void;
  onError?: (error: AxiosError | Error) => void;
}

export function useCustomersQuery({ search, page }: UseCustomersQueryProps): UseCustomersQueryResult {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customers", search, page],
    queryFn: () => CustomerService.getAllCustomers(search, page),
  });

  return {
    customers: data?.data ?? [],
    total: data?.total ?? 0,
    currentPage: data?.currentPage ?? 1,
    totalPages: data?.totalPages ?? 1,
    isLoadingCustomers: isLoading,
    isErrorCustomers: isError,
    errorCustomers: error,
  };
}

export function useCreateCustomerMutation({ onSuccess, onError }: CreateCustomerMutationProps) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, CreateCustomerRequest>({
    mutationFn: async (data) => CustomerService.createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      onSuccess?.();
    },
    onError,
  });
}

export function useUpdateCustomerMutation({ onSuccess, onError }: UpdateCustomerMutationProps) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, { id: string; data: CreateCustomerRequest }>({
    mutationFn: async ({ id, data }) => CustomerService.updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      onSuccess?.();
    },
    onError,
  });
}

export function useDeleteCustomerMutation({ onSuccess, onError }: DeleteCustomerMutationProps) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: async (id) => CustomerService.deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      onSuccess?.();
    },
    onError,
  });
}
