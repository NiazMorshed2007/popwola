import Link from "next/link";
import React from "react";

const Campaigns = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Your Campaigns</h1>
      <p className="text-secondary font-light w-6/12 text-sm mt-1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, quia
        dolor. Aut ut nesciunt alias consequuntur quaerat{" "}
      </p>

      <div className="campaigns-list flex-wrap py-8 flex items-center justify-start gap-3">
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
      </div>
    </div>
  );
};

const CampaignCard = () => (
  <Link href={"/editor"} className="p-4 w-[24%] rounded-lg bg-foreground">
    <img
      className="w-full mb-2 rounded-lg opacity-70"
      src="https://cdn.dribbble.com/userupload/7418617/file/original-043fd0bc1257ade8986ad38976035096.png?compress=1&resize=320x240&vertical=top"
      alt=""
    />
    <h1>Black Firday Discount🎲</h1>
    <p className="text-secondary font-light w-full text-xs mt-1">
      Lorem ipsum dolor sit, amet consect adipisng elit.
    </p>
  </Link>
);

export default Campaigns;
