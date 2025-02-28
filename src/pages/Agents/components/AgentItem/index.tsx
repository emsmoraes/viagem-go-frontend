import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import AgentItemOptionsMenu from "../AgentItemOptionsMenu";
import { Badge } from "@/shared/components/ui/badge";

function AgentItem() {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <Avatar className="w-11 h-11">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/20 font-bold text-primary text-xl">A</AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-md font-medium">AgentItem</h2>
              <Badge variant="subtle" label="Pré-configurado" size="xs" />
            </div>
            <p className="text-sm text-muted-foreground">Venda</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="subtle" label="Ativo" size="xs" className="bg-green-100 text-green-800" />

          <AgentItemOptionsMenu />
        </div>
      </div>

      <div className="flex items-center gap-2 my-4">
        <h3 className="text-zinc-600 line-clamp-2">
          Especializado em converter leads em vendas, com foco em apresentação de produtos e objeções.
        </h3>
      </div>
    </div>
  );
}

export default AgentItem;
