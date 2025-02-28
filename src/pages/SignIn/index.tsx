import SignInForm from "./components/SignInForm";

export function SignIn() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 gap-20">
      <div className="max-w-[1000px]">
        <div className="w-full mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">Bem vindo a Aurora</h2>
          <p className="text-center text-gray-600">
            Gerencie suas leads em múltiplos canais com agentes <br /> inteligentes
          </p>
        </div>
        <SignInForm />
        <div className="flex flex-col items-center justify-center gap-2 mt-10">
          <small className="text-center text-gray-600">&copy; Todos os direitos reservados a Aurora</small>
        </div>
      </div>
    </div>
  );
}
