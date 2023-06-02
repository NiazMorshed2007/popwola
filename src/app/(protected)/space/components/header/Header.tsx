import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import BreadCrumb from "./BreadCrumb";

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
        <div className="w-[33px] h-[33px] rounded-full bg-primary/10 flex items-center justify-center"></div>
      </div>
    </header>
  );
};

export default DashboardHeader;
