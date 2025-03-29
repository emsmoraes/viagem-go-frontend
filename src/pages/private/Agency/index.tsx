import { Navigate } from "react-router-dom";

import { useGetAgencyQuery } from "./hooks/useAgency";
import AgencyLogo from "./components/AgencyLogo";
import { CgSpinner } from "react-icons/cg";
import AgencyInfosForm from "./components/AgencyInfosForm";
import { useQueryClient } from "@tanstack/react-query";
import AgencyUsers from "./components/AgencyUsers";
import { Separator } from "@/shared/components/ui/separator";
import InviteUserModal from "./components/InviteUserModal";
import clsx from "clsx";

export function Agency() {
  const { agency, isLoadingAgency } = useGetAgencyQuery();
  const queryClient = useQueryClient();

  if (isLoadingAgency) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CgSpinner className="text-primary animate-spin text-6xl" />
      </div>
    );
  }

  if (!agency) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex h-full flex-col">
      <div className={clsx("flex-1 overflow-y-auto pb-6")}>
        <h1 className="mb-8 pt-3 text-xl font-medium">Editar agencia</h1>

        <div className="flex w-full flex-wrap gap-12">
          <AgencyLogo agency={agency} queryClient={queryClient} />

          <AgencyInfosForm
            queryClient={queryClient}
            defaultValues={{
              name: agency.name ?? "",
              description: agency.description ?? "",
              instagram: agency.instagram ?? "",
              locationLink: agency.locationLink || undefined,
              phone: agency.phone ?? undefined,
              website: agency.website || undefined,
              whatsapp: agency.whatsapp ?? undefined,
            }}
          />
        </div>

        <Separator className="mt-10 mb-6" />

        {agency.users && (
          <div className="lg:pr-6">
            <div className="mb-8 flex items-center gap-4">
              <h1 className="text-xl font-medium">Usuários</h1>
              <InviteUserModal agencyId={agency.id} />
            </div>
            <AgencyUsers users={agency.users} />
          </div>
        )}
      </div>
    </div>
  );
}
