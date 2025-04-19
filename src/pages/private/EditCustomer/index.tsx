import { Navigate, useParams } from "react-router-dom";
import { useCustomerByIdQuery } from "../Customers/hooks/useCustomer";
import { CgSpinner } from "react-icons/cg";
import { BackButton } from "@/shared/components/BackButton";
import DataForm from "./components/DataForm";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { CustomerDocument } from "@/shared/models/customer-document.model";

type DocumentOutput = Omit<CustomerDocument, "fileUrls"> & { files: string[] };

function renameFileUrlsToFiles(documents: CustomerDocument[]): any[] {
  return documents.map(({ fileUrls, ...rest }) => ({
    ...rest,
    files: fileUrls,
  }));
}

export function EditCustomer() {
  const { id } = useParams();

  const { customer, isLoadingCustomer, isErrorCustomer } = useCustomerByIdQuery({ id: id ?? "" });

  if (isLoadingCustomer) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CgSpinner className="text-primary animate-spin text-6xl" />
      </div>
    );
  }

  if (!customer || isErrorCustomer) {
    return <Navigate to={"/"} />;
  }

  const customerDocuments = renameFileUrlsToFiles(customer.documents);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ScrollArea className="flex h-full flex-col">
        <div className="mb-8 flex items-center gap-4 pt-3">
          <BackButton />
          <h1 className="text-xl font-medium">Editar cliente</h1>
        </div>

        <div className="lg:pr-6">
          <DataForm
            defaultValues={{
              fullName: customer.fullName,
              nickname: customer.nickname || "",
              rg: customer.rg || "",
              cpf: customer.cpf || "",
              birthDate: customer.birthDate || "",
              email: customer.email || undefined,
              phone: customer.phone || "",
              maritalStatus: customer.maritalStatus || "",
              profession: customer.profession || "",
              numberOfChildren: customer.numberOfChildren || undefined,
              postalCode: customer.postalCode || "",
              address: customer.address || "",
              addressNumber: customer.addressNumber || "",
              neighborhood: customer.neighborhood || "",
              complement: customer.complement || "",
              city: customer.city || "",
              state: customer.state || "",
              country: customer.country || "",
              family: customer.family,
              accommodationPreference: customer.accommodationPreference,
              airPreference: customer.airPreference,
              travelStyle: customer.travelStyle,
              interestedExperiences: customer.interestedExperiences,
              dreamTrips: customer.dreamTrips,
              recentTrips: customer.recentTrips,
              tags: customer.tags,
              observation: customer.observation || "",
              referralSource: customer.referralSource || "",
              profileImage: customer.imageUrl || undefined,
              customerDocuments: customerDocuments,
            }}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
