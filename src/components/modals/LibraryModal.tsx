"use client";
import CampaignCardSkeleton from "@/app/(protected)/space/campaigns/components/CampaignCardSkeleton";
import { updateCampaignDocument } from "@/lib/services/campaign.service";
import { getAllLibraryTemplates } from "@/lib/services/library.service";
import { createPopup, updatePopupDocument } from "@/lib/services/popup.service";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "../ui/use-toast";

interface Props {
  open: boolean;
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  should_update_popup?: boolean;
  popup_id?: string;
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
    popup_id,
    campaign_name,
  } = props;
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selecting, setSelecting] = useState<boolean>(false);
  const [selectedPopup, setSelectedPopup] = useState<any>();

  const router = useRouter();
  const { toast } = useToast();

  const handleUpdatePopup = async () => {
    setSelecting(true);
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

    try {
      const updatedPopup = await updatePopupDocument(popup_id!, {
        ...rest,
      });
      toast({
        title: "Popup updated successfully",
        description: "Redirecting to editor...",
      });
      setSelecting(false);
      setOpen(false);
      router.push(`/editor/${updatedPopup.$id}`);
    } catch (err: any) {
      setOpen(false);
      setSelecting(false);
      toast({
        variant: "destructive",
        title: "Cannot update popup",
        description: err.message,
      });
    }
  };

  const handleCreatePopup = async () => {
    setSelecting(true);

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

      try {
        const newPopup = await createPopup({
          ...rest,
          name: campaign_name,
          campaign_id: campaign_id,
        });
        await updateCampaignDocument(campaign_id, {
          popup_id: newPopup.$id!,
        });
        setOpen(false);
        setSelecting(false);
        toast({
          title: "Popup created successfully",
          description: "Redirecting to editor...",
        });
        router.push(`/editor/${newPopup.$id}`);
      } catch (err: any) {
        setOpen(false);
        setSelecting(false);
        toast({
          variant: "destructive",
          title: "Cannot create popup",
          description: err.message,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Please select a template",
      });
    }
  };

  const selectTemplateforCampaign = async () => {
    setSelecting(true);

    if (should_update_popup) {
      await handleUpdatePopup();
    } else {
      await handleCreatePopup();
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
                  className={`w-[310px] border cursor-pointer  ${
                    selectedPopup?.$id === lib.$id
                      ? "border-brand"
                      : "border-transparent"
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
            disabled={selecting}
            onClick={selectTemplateforCampaign}
            className="w-full py-3 text-sm"
          >
            {selecting && <Loader size={14} className="animate-spin mr-4" />}
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LibraryModal;
