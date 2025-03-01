import SignInForm from "./components/SignInForm";
import loginBg from "@/shared/assets/images/login-bg.jpg";

export function SignIn() {
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
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
