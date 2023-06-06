"use client";

import { convertStylesToCSS } from "@/components/editor/helpers/convertToCssString";
import { convertCSSToStyles } from "@/components/editor/helpers/stringToCss";
import SmallPreview from "@/components/editor/preview/SmallPreview";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import {
  getCampaignDocument,
  updateCampaignDocument,
} from "@/lib/services/campaign.service";
import { createPopup, getPopupDocuemnt } from "@/lib/services/popup.service";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CampaignForm from "./components/CampaignForm";
import CampaignLoadingSkeleton from "./components/CampaignLoadingSkeleton";
import Preview from "@/components/editor/preview/Preview";

const ManageCampaign = () => {
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
  const [popup, setPopup] = useState<any>();

  const fetchCampaign = async () => {
    const campaignData = await getCampaignDocument(pathname.split("/")[3]);
    setCampaign(campaignData);
    setLoading(false);
    if (campaignData.popup_id) {
      fetchPopup(campaignData.popup_id!);
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

  const selectTemplateforCampaign = async () => {
    if (popup) {
      console.log("should update popup");
    } else {
      const { id, ...rest } = popupSlice;
      const newPopup = await createPopup({
        ...rest,
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
            <div className="w-[400px] flex items-center justify-center h-[200px] mb-5 bg-secondary/5 rounded-xl">
              {popup.name} Popup
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
