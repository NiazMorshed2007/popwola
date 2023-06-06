"use client";
import CampaignsList from "./components/CampaignsList";

const Campaigns = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Your Campaigns</h1>
      <CampaignsList />
    </div>
  );
};

export default Campaigns;
