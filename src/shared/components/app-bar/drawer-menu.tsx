import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { Navbar } from "../navbar";
import { useState } from "react";

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-end border-b border-solid border-[#1C1C1C1A] bg-white py-2 pr-2 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex w-full items-center justify-between px-2">
          <h1 className="text-center text-3xl font-medium">
            <span className="text-primary">GO</span>
          </h1>
          <SheetTrigger asChild>
            <Button variant="secondary" size={"icon"}>
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent className="flex flex-col bg-white p-0 text-black">
          <SheetHeader className="border-secondary border-b border-solid p-5 text-left">
            <SheetTitle className="text-black">Menu</SheetTitle>
          </SheetHeader>

          <div className="flex-1">
            <Navbar.Mobile setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DrawerMenu;
