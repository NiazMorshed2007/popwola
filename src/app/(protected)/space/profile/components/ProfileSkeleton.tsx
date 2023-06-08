import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <>
      <Skeleton className="w-[100px] h-[100px] rounded-full bg-primary/10" />
      <div className="my-16 flex flex-col items-center gap-6">
        <div className="mb-7  w-[500px]">
          <Skeleton className="w-[50px] mb-2 h-[10px]" />
          <Skeleton className="w-full h-[30px]" />
        </div>

        <div className="mb-7  w-[500px]">
          <Skeleton className="w-[50px] mb-2 h-[10px]" />
          <Skeleton className="w-full h-[30px]" />
        </div>

        <div className="mb-7  w-[500px]">
          <Skeleton className="w-[50px] mb-2 h-[10px]" />
          <Skeleton className="w-full h-[30px]" />
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
