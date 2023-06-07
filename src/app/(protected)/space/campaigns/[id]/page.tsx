"use client";

import { convertCSSToStyles } from "@/components/editor/helpers/stringToCss";
import SmallPreview from "@/components/editor/preview/SmallPreview";
import LibraryModal from "@/components/modals/LibraryModal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import { getCampaignDocument } from "@/lib/services/campaign.service";
import { getPopupDocuemnt } from "@/lib/services/popup.service";
import { Pencil } from "lucide-react";
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
  });
  const [popup, setPopup] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const fetchCampaign = async () => {
    const campaignData = await getCampaignDocument(pathname.split("/")[3]);
    setCampaign(campaignData);
    setLoading(false);
    if (campaignData.popup_id) {
      fetchPopup(campaignData.popup_id!);
    } else {
      if (query.get("template") === "true") {
        setModalOpen(true);
      }
    }
  };

  const fetchPopup = async (id: string) => {
    const popupData = await getPopupDocuemnt(id);
    setPopup({
      ...popupData,
      bg: convertCSSToStyles(popupData.bg),
      title_value: popupData.title_value,
      title_style: convertCSSToStyles(popupData.title_style),
      subtitle_value: popupData.subtitle_value,
      subtitle_style: convertCSSToStyles(popupData.subtitle_style),
      img_url: popupData.img_url,
      image_style: convertCSSToStyles(popupData.image_style),
      button_value: popupData.button_value,
      button_style: convertCSSToStyles(popupData.button_style),
    });
  };

  useEffect(() => {
    if (!isCreating) {
      fetchCampaign();
      if (popup) {
      }
    } else {
      setLoading(false);
    }
  }, []);

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
              {/* {popup && <>{popup[0].name}</>} */}
              <CampaignForm initialData={campaign} isCreating={isCreating} />
            </ScrollArea>
          </div>
          <div className="right h-full flex items-center flex-col justify-center">
            {/* <div> */}
            <div className="w-[400px] overflow-hidden flex items-center justify-center h-[200px] mb-5 bg-secondary/5 rounded-xl">
              <div
                style={{ scale: 0.4, marginRight: "140px" }}
                className="w-full h-full"
              >
                <SmallPreview {...popup} />
              </div>
            </div>
            {isCreating ? (
              <>
                <h2 className="text-sm mb-4 text-secondary/70">
                  Create campaign first to get started
                </h2>
              </>
            ) : (
              <>
                {!popup && !isCreating && (
                  <h2 className="text-sm mb-4 text-secondary/70">
                    You haven&apos;t created any template yet
                  </h2>
                )}
                {/* <Link href={"/editor"}> */}
                <div className="flex items-center gap-3">
                  <LibraryModal
                    campaign_name={campaign.name}
                    campaign_id={campaign?.$id!}
                    should_update_popup={popup ? true : false}
                    open={modalOpen}
                    setOpen={setModalOpen}
                  >
                    <Button className="bg-secondary /10 hover:bg-secondary/5">
                      Select a template
                    </Button>
                  </LibraryModal>
                  {popup && (
                    <Link href={`/editor/${popup.$id}`}>
                      <Button>
                        <Pencil size={13} className="mr-2" /> Edit in Editor
                      </Button>
                    </Link>
                  )}
                </div>
                {/* </Link> */}
              </>
            )}
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ManageCampaign;
