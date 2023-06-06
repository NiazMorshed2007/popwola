"use client";

import { convertStylesToCSS } from "@/components/editor/helpers/convertToCssString";
import SmallPreview from "@/components/editor/preview/SmallPreview";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import { PopupInterface } from "@/interfaces/popup.interface";
import {
  getCampaignDocument,
  updateCampaignDocument,
} from "@/lib/services/campaign.service";
import { createPopup, getPopupDocuemnt } from "@/lib/services/popup.service";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CampaignForm from "./components/CampaignForm";
import CampaignLoadingSkeleton from "./components/CampaignLoadingSkeleton";
import { Pencil } from "lucide-react";

const ManageCampaign = () => {
  // temporary
  const { popupSlice } = usePopupSlice();
  //

  const pathname: string = usePathname();
  const isCreating = pathname === "/space/campaigns/create";

  const [loading, setLoading] = useState<boolean>(true);
  const [campaign, setCampaign] = useState<CampaignInterface>({
    name: "",
    description: "",
    is_recurring: false,
    popup_id: "",
  });
  const [popup, setPopup] = useState<PopupInterface>();

  const fetchCampaign = async () => {
    const campaignData = await getCampaignDocument(pathname.split("/")[3]);
    setCampaign(campaignData);
    setLoading(false);
    fetchPopup(campaignData.popup_id!);
  };

  const fetchPopup = async (id: string) => {
    const popupData = await getPopupDocuemnt(id);
    setPopup(popupData);
  };

  const selectTemplateforCampaign = async () => {
    if (popup) {
      console.log("should update popup");
    } else {
      const newPopup = await createPopup({
        ...popupSlice,
        campaign_id: campaign.$id!,
        name: campaign.name,
        bg: convertStylesToCSS(popupSlice.bg),
        title_style: convertStylesToCSS(popupSlice.title_style),
        subtitle_style: convertStylesToCSS(popupSlice.subtitle_style),
        image_style: convertStylesToCSS(popupSlice.image_style),
        button_style: convertStylesToCSS(popupSlice.button_style),
      });

      const updatedCampaign = await updateCampaignDocument(campaign.$id!, {
        popup_id: newPopup.$id!,
      });

      console.log(newPopup, "the popup");
      console.log(updatedCampaign, "the campaign");
    }
  };

  useEffect(() => {
    if (!isCreating) {
      fetchCampaign();
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
            <div className="w-[400px] h-[200px] mb-5 bg-secondary/5 rounded-xl">
              <SmallPreview height="200px" />
            </div>
            {isCreating ? (
              <>
                <h2 className="text-sm mb-4 text-secondary/70">
                  Create campaign first to get started
                </h2>
              </>
            ) : (
              <>
                <h2 className="text-sm mb-4 text-secondary/70">
                  You haven&apos;t created any template yet
                </h2>
                {/* <Link href={"/editor"}> */}
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => {
                      selectTemplateforCampaign();
                    }}
                    className="bg-secondary /10 hover:bg-secondary/5"
                  >
                    Select a template
                  </Button>
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
