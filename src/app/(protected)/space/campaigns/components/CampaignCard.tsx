import { CampaignInterface } from "@/interfaces/campaign.interface";
import Link from "next/link";
import React from "react";

const CampaignCard: React.FC<CampaignInterface & { $id: string }> = (props) => {
  const { name, description, $id, is_active } = props;
  return (
    <Link
      href={`/space/campaigns/${$id}`}
      className="p-4 w-[24%] rounded-lg bg-foreground hover:bg-secondary/5 transition-all"
    >
      <div className="h-[180px] text-brand text-2xl bg-dark rounded-lg mb-2 w-full flex items-center justify-center">
        {name[0]}C
      </div>
      <div className="flex items-center gap-3">
        <h1>{name}</h1>
        <div className="p-1 px-2 text-xs bg-dark rounded-md">
          {is_active ? "active" : "inactive"}
        </div>
      </div>
      <p className="text-secondary font-light w-full text-xs mt-1">
        {description}
      </p>
    </Link>
  );
};

export default CampaignCard;
