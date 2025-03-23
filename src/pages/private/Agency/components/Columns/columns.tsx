import { ColumnDef } from "@tanstack/react-table";
import { User, UserRoleEntry, UserRole } from "@/shared/models";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";

export const columns: ColumnDef<Omit<User, "password">>[] = [
  {
    accessorKey: "avatarUrl",
    header: "Imagem",
    cell: ({ row }) => (
      <Avatar className="h-12 w-12">
        <AvatarImage src={row.original.avatarUrl ?? undefined} alt={row.original.name || "Usuário"} />
        <AvatarFallback className="text-lg">{row.original.email?.charAt(0) || "-"}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => row.original.name || "-",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email || "-",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => row.original.phone || "-",
  },
  {
    accessorKey: "userRoles",
    header: "Cargos",
    cell: ({ row }) => {
      const roleMap: Record<UserRole, string> = {
        OWNER: "Proprietário",
        ADMIN: "Administrador",
        EMPLOYEE: "Funcionário",
      };

      const roles =
        row.original.userRoles?.map((role: UserRoleEntry) => roleMap[role.role]).join(", ") || "Nenhum cargo";
      return roles;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (row.original.active ? "Ativo" : "Pendente"),
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <Button variant="outline" disabled>
        Editar
      </Button>
    ),
  },
];
