import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import BreadCrumb from "./BreadCrumb";
import AvatarDropDown from "./AvatarDropDown";

const DashboardHeader = () => {
  return (
    <header className="flex sticky top-0 items-center justify-between px-7 pb-2">
      <BreadCrumb />
      <div className="flex items-center gap-5">
        <Link href="/space/campaigns/create">
          <Button>
            <Plus className="mr-1" size={14} /> Create Campaign
          </Button>
        </Link>
        <AvatarDropDown />
      </div>
    </header>
  );
};

export default DashboardHeader;
