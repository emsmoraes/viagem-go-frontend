import { User } from "@/shared/models";
import React from "react";
import { DataTable } from "../DataTable";
import { columns } from "../Columns/columns";

interface AgencyUsersProps {
  users: Omit<User, "password">[];
}

function AgencyUsers({ users }: AgencyUsersProps) {
  return <DataTable columns={columns} data={users} />;
}

export default AgencyUsers;
