import { authStore } from "@/shared/store/auth.store";
import UserProfileInfosForm from "./components/UserProfileInfosForm";
import { Navigate } from "react-router-dom";

export function UserProfile() {
  const { user } = authStore();

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-4 pt-3 text-xl font-medium">Editar perfil</h1>

      <UserProfileInfosForm
        defaultValues={{
          email: user.email,
          name: user.name,
          phone: user.phone ?? "",
          proposalThankYouMessageTitle: user.proposalThankYouMessageTitle ?? "",
          proposalThankYouMessageSubtitle: user.proposalThankYouMessageSubtitle ?? "",
        }}
        userId={user.id}
      />
    </div>
  );
}
