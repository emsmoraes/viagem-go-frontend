import { Button } from "@/components/ui/button";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold bg-mint-500">Bem-vindo ao Aurora!</h1>
      <Button className="mt-2">Clique aqui</Button>
    </div>
  );
}
