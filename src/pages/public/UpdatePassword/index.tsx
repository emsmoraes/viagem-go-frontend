import bgWallpaper from "@/shared/assets/images/login-bg.jpg";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
import { toast } from "sonner";
import { useGetUserKeyInfoMutation } from "@/pages/public/ActivateUser/hooks/useActiveUser";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePassword() {
  const { key } = useParams();
  const navigate = useNavigate();

  const { getUserKeyInfo, userKeyResponse } = useGetUserKeyInfoMutation({
    onSuccess: () => {},
    onError: () => {
      toast.error("Chave inválida");
      navigate("/sign-in");
    },
  });

  useEffect(() => {
    getUserKeyInfo(key!);
  }, [key]);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100 overflow-hidden pt-4">
      <div
        className="flex flex-col items-center justify-center rounded-t-3xl"
        style={{
          backgroundImage: `url(${bgWallpaper})`,
          width: "100%",
          height: "100%",
          maxHeight: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          maxWidth: "1525px",
        }}
      >
        <div className="w-[90%] sm:w-[500px]">
          <UpdatePasswordForm validKey={userKeyResponse?.key!!} />
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
