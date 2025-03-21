import { authStore } from "@/shared/store/auth.store";
import UserProfileInfosForm from "./components/UserProfileInfosForm";
import { Navigate } from "react-router-dom";
import { useState, useTransition } from "react";
import SingleImageUpload from "@/shared/components/SingleImageUpload";
import { PiUserLight } from "react-icons/pi";
import { toast } from "sonner";
import { UserProfileService } from "@/shared/services/entities";

export function UserProfile() {
  const { user, setUser } = authStore();
  const [profileImage, setProfileImage] = useState<File | string | null>(user?.avatarUrl || null);
  const [isPending, startTransition] = useTransition();

  if (!user) {
    return <Navigate to={"/"} />;
  }

  const UserAvatarPlaceholder = () => <PiUserLight size={100} className="text-primary group-hover:text-primary/80" />;

  const handleRemoveAvatar = async () => {
    startTransition(async () => {
      try {
        await UserProfileService.deleteUserAvatar();

        setProfileImage(null);
        setUser({ ...user, avatarUrl: null });

        toast.success("Avatar removido com sucesso!");
      } catch {
        toast.error("Erro ao remover avatar.");
      }
    });
  };

  const handleImageChange = async (file: File | null) => {
    if (!file) {
      return handleRemoveAvatar();
    }

    startTransition(async () => {
      try {
        const response = await UserProfileService.updateUserAvatar(file);

        setProfileImage(response.avatarUrl);
        setUser({ ...user, avatarUrl: response.avatarUrl });

        toast.success("Avatar atualizado com sucesso!");
      } catch {
        toast.error("Erro ao atualizar avatar.");
      }
    });
  };

  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-8 pt-3 text-xl font-medium">Editar perfil</h1>

      <div className="flex w-full flex-wrap gap-12">
        <SingleImageUpload
          currentImage={profileImage}
          onChange={handleImageChange}
          ImagePickerPlaceholder={UserAvatarPlaceholder}
          isPending={isPending}
        />

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
    </div>
  );
}
