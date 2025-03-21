import loginBg from "@/shared/assets/images/login-bg.jpg";
import { useGetUserKeyInfoMutation } from "./hooks/useActiveUser";
import { useEffect } from "react";
import ActivateUserForm from "./components/ActivateUserForm";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

function ActivateUser() {
  const { key } = useParams();
  const navigate = useNavigate();

  const { isLoadingGetUserKeyInfo, getUserKeyInfo, userKeyResponse } = useGetUserKeyInfoMutation({
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
          backgroundImage: `url(${loginBg})`,
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
          {isLoadingGetUserKeyInfo ? (
            <div className="w-full space-y-6 bg-white rounded-3xl shadow-xl px-7 py-10 h-[500px] flex items-center justify-center">
              <CgSpinner className="animate-spin" size={60} />
            </div>
          ) : (
            <ActivateUserForm email={userKeyResponse?.user.email ?? ""} validKey={userKeyResponse?.key!!} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivateUser;
