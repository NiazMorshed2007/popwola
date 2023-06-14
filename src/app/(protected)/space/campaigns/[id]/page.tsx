"use client";

import LibraryModal from "@/components/modals/LibraryModal";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import { getCampaignDocument } from "@/lib/services/campaign.service";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CampaignForm from "./components/CampaignForm";
import CampaignLoadingSkeleton from "./components/CampaignLoadingSkeleton";

const ManageCampaign = () => {
  const pathname: string = usePathname();
  const query = useSearchParams();
  const isCreating = pathname === "/space/campaigns/create";

  const [loading, setLoading] = useState<boolean>(true);
  const [campaign, setCampaign] = useState<CampaignInterface>({
    name: "",
    description: "",
    is_recurring: false,
    popup_id: "",
    is_active: false,
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const fetchCampaign = async () => {
    try {
      const campaignData = await getCampaignDocument(pathname.split("/")[3]);
      setCampaign(campaignData);
      setLoading(false);
      if (query.get("template") === "true" && !campaignData.popup_id) {
        setModalOpen(true);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isCreating) {
      fetchCampaign();
    } else {
      setLoading(false);
    }
  }, [open]);

  return (
    <>
      {loading ? (
        <CampaignLoadingSkeleton />
      ) : (
        <div
          style={{
            height: "calc(100vh - 5rem)",
          }}
          className="p-0 flex items-center justify-between"
        >
          <div className="left flex flex-col w-7/12">
            <ScrollArea
              style={{
                height: "calc(100vh - 6rem)",
              }}
            >
              <h1 className="text-2xl mt-7 font-semibold text-primary/80">
                {isCreating && "Create"} Campaign {!isCreating && "Details"}
              </h1>
              <CampaignForm initialData={campaign} isCreating={isCreating} />
            </ScrollArea>
          </div>
          <div className="right h-full flex items-center flex-col justify-center">
            <div className="w-[400px] relative overflow-hidden flex items-center justify-center h-[200px] mb-5 bg-secondary/5 rounded-xl text-xl text-brand font-semibold">
              <Image
                src={"/popup-placeholder.png"}
                width={400}
                className="absolute top-0 rounded-lg left-0 -z-10 opacity-10"
                height={200}
                alt="popup-placeholder"
              />
              {!isCreating && campaign && <>{campaign.name} (Popup)</>}
            </div>
            {isCreating ? (
              <>
                <h2 className="text-sm mb-4 text-secondary/70">
                  Create campaign first to get started
                </h2>
              </>
            ) : (
              <>
                {!campaign.popup_id && !isCreating && (
                  <h2 className="text-sm mb-4 text-secondary/70">
                    You haven&apos;t selected any template yet
                  </h2>
                )}
                <div className="flex items-center gap-3">
                  <LibraryModal
                    campaign_name={campaign.name}
                    campaign_id={campaign?.$id!}
                    should_update_popup={campaign.popup_id ? true : false}
                    open={modalOpen}
                    popup_id={campaign.popup_id}
                    setOpen={setModalOpen}
                  >
                    <div
                      className={buttonVariants({
                        className: "bg-secondary /10 hover:bg-secondary/5",
                      })}
                    >
                      Select a template
                    </div>
                  </LibraryModal>
                  {campaign.popup_id && (
                    <Link href={`/editor/${campaign.popup_id}`}>
                      <Button>
                        <Pencil size={13} className="mr-2" /> Edit in Editor
                      </Button>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ManageCampaign;
