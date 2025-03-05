import { authStore } from "@/shared/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger } from "../ui/popover";

const LoggedUser = () => {
  const { user } = authStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 duration-200 hover:bg-gray-100 hover:opacity-90 p-3 rounded-xl">
          <Avatar>
            <AvatarImage
              src="https://upload.wikimedia.org/wikipedia/it/thumb/8/81/Fredfl.jpg/260px-Fredfl.jpg"
              alt="avatar"
            />
            <AvatarFallback>{user?.name?.slice(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>

          <p className="overflow-hidden truncate text-ellipsis text-nowrap text-[16px] font-[400] text-black">
            {user?.name.split(" ")[0]}
          </p>
        </div>
      </PopoverTrigger>
    </Popover>
  );
};

export default LoggedUser;
