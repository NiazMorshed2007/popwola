import CreateCampaignModal from "@/components/modals/CreateCampaignModal";
import { Plus } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="flex sticky top-0 items-center justify-between px-7 pb-2">
      <h2 className="text-sm font-medium text-primary/50">Dashborad</h2>
      <div className="flex items-center gap-5">
        <CreateCampaignModal>
          <Plus className="mr-1" size={14} /> Create Campaign
        </CreateCampaignModal>
        <div className="w-[33px] h-[33px] rounded-full bg-primary/10 flex items-center justify-center"></div>
      </div>
    </header>
  );
};

export default DashboardHeader;
