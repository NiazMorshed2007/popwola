import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CampaignLoadingSkeleton = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 5rem)",
      }}
      className="p-0 flex items-center justify-between"
    >
      <div className="left flex flex-col w-7/12">
        <Skeleton className="w-1/2 h-[20px]" />
        <div className="my-4 mt-16">
          <div className="mb-7">
            <Skeleton className="w-[50px] mb-2 h-[10px]" />
            <Skeleton className="w-8/12 h-[30px]" />
          </div>

          <div className="mb-7">
            <Skeleton className="w-[50px] mb-2 h-[10px]" />
            <Skeleton className="w-8/12 h-[30px]" />
          </div>
          <div className="mb-7">
            <Skeleton className="w-[50px] mb-2 h-[10px]" />
            <Skeleton className="w-8/12 h-[30px]" />
          </div>
          <div className="mb-7">
            <Skeleton className="w-[50px] mb-2 h-[10px]" />
            <Skeleton className="w-8/12 h-[30px]" />
          </div>
        </div>
      </div>
      <div className="right flex flex-col w-5/12">
        <div className="flex items-center gap-5 flex-col justify-between">
          <Skeleton className="w-10/12 h-[200px]" />
          <Skeleton className="w-[230px] mb-2 h-[15px]" />
        </div>
      </div>
    </div>
  );
};

export default CampaignLoadingSkeleton;
