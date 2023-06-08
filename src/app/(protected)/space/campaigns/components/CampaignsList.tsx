"use client";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import { getAllCampaigns } from "@/lib/services/campaign.service";
import React, { useEffect, useState } from "react";
import CampaignCardSkeleton from "./CampaignCardSkeleton";
import CampaignCard from "./CampaignCard";
import { Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CampaignsList = () => {
  const [campaignsList, setCampaignsList] = useState<CampaignInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      const campaigns = await getAllCampaigns();
      setCampaignsList(campaigns.documents);
      setLoading(false);
    };
    fetchCampaigns();
  }, []);
  return (
    <div className="campaigns-list flex-wrap py-8 flex justify-start gap-3">
      {loading && (
        <>
          <CampaignCardSkeleton />
          <CampaignCardSkeleton />
          <CampaignCardSkeleton />
          <CampaignCardSkeleton />
          <CampaignCardSkeleton />
          <CampaignCardSkeleton />
          <CampaignCardSkeleton />
          <CampaignCardSkeleton />
        </>
      )}
      {campaignsList.length === 0 && !loading && (
        <div
          style={{
            height: "calc(100vh - 300px)",
          }}
          className="w-full flex items-center justify-center"
        >
          <div className="p-5 py-10 rounded-xl w-[400px] flex items-center flex-col justify-center bg-foreground">
            <Orbit className="mb-7" size={50} />
            <h1 className="text-xl font-semibold">There is no campaign yet!</h1>
            <Link href="/space/campaigns/create" className="mt-3">
              <Button>Create Campaign</Button>
            </Link>
          </div>
        </div>
      )}
      {campaignsList.map((campaign: any) => (
        <CampaignCard key={campaign.$id} {...campaign} />
      ))}
    </div>
  );
};

export default CampaignsList;
