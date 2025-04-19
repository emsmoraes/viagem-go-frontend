import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Card } from "@/shared/components/ui/card";
import { Customer } from "@/shared/models/customer.model";
import { FiEdit3 } from "react-icons/fi";
import DeleteCostumer from "../DeleteCostumer";
import { Link } from "react-router-dom";

function CustomerItem({ customer }: { customer: Customer }) {
  return (
    <Card className="grid grid-cols-5 items-center gap-2 p-4">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={customer.imageUrl || undefined} />
          <AvatarFallback>{customer.fullName[0]}</AvatarFallback>
        </Avatar>
        <span>{customer.fullName}</span>
      </div>

      <span>{customer.email || "-"}</span>
      <span>{customer.phone || "-"}</span>
      <span>{new Date(customer.createdAt).toLocaleDateString()}</span>

      <div className="flex h-full gap-2">
        <DeleteCostumer customerId={customer.id} />
        <Link
          to={`/customers/${customer.id}`}
          className="text-primary aspect-square h-full rounded-full bg-blue-100 px-3 flex items-center justify-center"
        >
          <FiEdit3 size={20} />
        </Link>
      </div>
    </Card>
  );
}

export default CustomerItem;
