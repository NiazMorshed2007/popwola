"use client";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import { getAllCampaigns } from "@/lib/services/campaign.service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CampaignCardSkeleton from "./components/CampaignCardSkeleton";
import CampaignsList from "./components/CampaignsList";

const Campaigns = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Your Campaigns</h1>
      <p className="text-secondary font-light w-6/12 text-sm mt-1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, quia
        dolor. Aut ut nesciunt alias consequuntur quaerat{" "}
      </p>
      <CampaignsList />
    </div>
  );
};

export default Campaigns;
