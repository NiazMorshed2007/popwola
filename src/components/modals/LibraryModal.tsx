"use client";
import CampaignCardSkeleton from "@/app/(protected)/space/campaigns/components/CampaignCardSkeleton";
import { getAllLibraryTemplates } from "@/lib/services/library.service";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { updateCampaignDocument } from "@/lib/services/campaign.service";
import { createPopup } from "@/lib/services/popup.service";

interface Props {
  open: boolean;
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  should_update_popup?: boolean;
  campaign_id: string;
  campaign_name: string;
}

const LibraryModal: React.FC<Props> = (props) => {
  const {
    children,
    open,
    setOpen,
    should_update_popup,
    campaign_id,
    campaign_name,
  } = props;
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPopup, setSelectedPopup] = useState<any>();

  const selectTemplateforCampaign = async () => {
    if (should_update_popup) {
      console.log("should update popup");
    } else {
      if (selectedPopup) {
        const {
          $id,
          $collectionId,
          $createdAt,
          $databaseId,
          $permissions,
          $updatedAt,
          name,
          preview_image,
          button_url,
          ...rest
        } = selectedPopup;
        const newPopup = await createPopup({
          ...rest,
          name: `${campaign_name}`,
          campaign_id: campaign_id,
        });
        const updatedCampaign = await updateCampaignDocument(campaign_id, {
          popup_id: newPopup.$id!,
        });

        setOpen(false);
      } else {
      }
    }
  };

  useEffect(() => {
    const fetchLibrary = async () => {
      const fetchLibraries = async () => {
        setLoading(true);
        const libraries = await getAllLibraryTemplates();
        setLibrary(libraries.documents);
        setLoading(false);
      };
      fetchLibraries();
    };

    fetchLibrary();
  }, []);
  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[870px]">
        <h1 className="text-2xl font-semibold">Select a template</h1>
        <div className="py-2">
          <ScrollArea
            className="flex items-center gap-3"
            style={{
              height: "400px",
            }}
          >
            {loading && (
              <div className="flex items-center gap-4 flex-wrap">
                <CampaignCardSkeleton />
                <CampaignCardSkeleton />
                <CampaignCardSkeleton />
                <CampaignCardSkeleton />
                <CampaignCardSkeleton />
                <CampaignCardSkeleton />
                <CampaignCardSkeleton />
                <CampaignCardSkeleton />
              </div>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              {library.map((lib: any, i: number) => (
                <div
                  onClick={() => {
                    setSelectedPopup(lib);
                  }}
                  key={i}
                  className={`w-[310px] border cursor-pointer border-transparent ${
                    selectedPopup?.$id === lib.$id && "border-brand"
                  } bg-secondary/10 p-3 pb-2 rounded-lg`}
                >
                  <img src={lib.preview_image} className="rounded-lg" alt="" />
                  <div className="mt-2"></div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="button-group flex items-center gap-6 justify-end">
          <Button
            onClick={selectTemplateforCampaign}
            className="w-full py-3 text-sm"
          >
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LibraryModal;
