import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CampaignCardSkeleton = () => {
  return (
    <Skeleton className="w-[240px] h-[260px] rounded-lg p-4">
      <Skeleton className="h-[160px] bg-secondary/10" />
      <div className="mt-5">
        <Skeleton className="w-[130px] h-[10px] bg-secondary/10" />
        <div className="mt-4">
          <Skeleton className="w-full h-[10px] bg-secondary/10" />
        </div>
      </div>
    </Skeleton>
  );
};

export default CampaignCardSkeleton;
