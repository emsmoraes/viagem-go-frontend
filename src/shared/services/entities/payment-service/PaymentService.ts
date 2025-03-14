import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type CreateCheckoutRequest = {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
};

export type CheckoutResponse = {
  url: string;
};

const createCheckoutSession = async (data: CreateCheckoutRequest): Promise<CheckoutResponse> => {
  try {
    const response = await api.post("stripe/create-checkout-session", data);
    return response.data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const PaymentService = {
  createCheckoutSession,
};
