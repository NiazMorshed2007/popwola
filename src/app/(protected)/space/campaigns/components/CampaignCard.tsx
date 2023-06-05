import SmallPreview from "@/components/editor/preview/SmallPreview";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import Link from "next/link";
import React from "react";

const CampaignCard: React.FC<CampaignInterface & { $id: string }> = (props) => {
  const { name, description, $id } = props;
  return (
    <Link
      href={`/space/campaigns/${$id}`}
      className="p-4 w-[24%] rounded-lg bg-foreground hover:bg-secondary/5 transition-all"
    >
      <SmallPreview />
      <h1 className="mt-4">{name}</h1>
      <p className="text-secondary font-light w-full text-xs mt-1">
        {description}
      </p>
    </Link>
  );
};

export default CampaignCard;
