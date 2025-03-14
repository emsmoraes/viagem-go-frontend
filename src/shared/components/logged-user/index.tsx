import { authStore } from "@/shared/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger } from "../ui/popover";
import { LogOutIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const LoggedUser = () => {
  const { user, logout } = authStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    queryClient.clear();
    logout();
    navigate("/sign-in");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 rounded-xl pr-0 duration-200 hover:bg-gray-100 hover:opacity-90">
          <div className="flex flex-grow items-center gap-2 py-3 pl-3 hover:text-blue-500">
            <Avatar>
              <AvatarImage
                src="https://upload.wikimedia.org/wikipedia/it/thumb/8/81/Fredfl.jpg/260px-Fredfl.jpg"
                alt="avatar"
              />
              <AvatarFallback>{user?.name?.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="truncate overflow-hidden text-[16px] font-[400] text-nowrap text-ellipsis text-black">
              {user?.name.split(" ")[0]}
            </p>
          </div>

          <div className="group flex h-full items-center gap-2 rounded-r-lg p-1 px-3 hover:bg-red-100/80">
            <button className="h-full text-gray-500 group-hover:text-red-500" onClick={handleLogout}>
              <LogOutIcon />
            </button>
          </div>
        </div>
      </PopoverTrigger>
    </Popover>
  );
};

export default LoggedUser;
