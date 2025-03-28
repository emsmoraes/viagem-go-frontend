import { Button } from "@/shared/components/ui/button";
import usePageTitle from "@/shared/hooks/usePageTitle";
import { PaymentService } from "@/shared/services/entities";

export function Home() {
  const currentRoute = usePageTitle();

  const handlePayment = async (priceId: string, planType: "INDIVIDUAL" | "AGENCY") => {
    try {
      const response = await PaymentService.createCheckoutSession({
        priceId,
        planType,
        successUrl: window.location.origin,
        cancelUrl: window.location.origin,
      });

      window.location.href = response.url;
    } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);
    }
  };

  return (
    <div className="flex h-full flex-1 flex-col gap-4 bg-[#F7F7F7]">
      <h1 className="mb-3 text-3xl font-semibold text-black">{currentRoute.label}</h1>
      <Button
        onClick={() => {
          handlePayment("price_1R1vo2Jemd6Yr0dUQ3L2E3cN", "INDIVIDUAL");
        }}
      >
        PAGAR
      </Button>
    </div>
  );
}
