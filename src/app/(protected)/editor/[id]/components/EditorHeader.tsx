import Logo from "@/components/Logo";
import { convertStylesToCSS } from "@/components/editor/helpers/convertToCssString";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedView } from "@/hooks/selectedViewHook";
import {
  getCampaignDocument,
  updateCampaignDocument,
} from "@/lib/services/campaign.service";
import { updatePopupDocument } from "@/lib/services/popup.service";
import { PopupSliceInterface } from "@/redux/slices/popupSlice";
import {
  SupportedResponsiveViews,
  setView,
} from "@/redux/slices/responsiveSlice";
import { update } from "lodash";
import {
  Cloud,
  Eye,
  Link2,
  MonitorDot,
  Rocket,
  Smartphone,
  Tablet,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EditorHeader = () => {
  const { popupSlice } = usePopupSlice();
  const selectedView = useSelectedView();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [saving, setSaving] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<any>();
  const [publishing, setPublishing] = useState<boolean>(false);

  const reponsive_views: {
    id: SupportedResponsiveViews;
    icon: React.ReactNode;
  }[] = [
    {
      id: "desktop",
      icon: <MonitorDot size={17} />,
    },
    {
      id: "tablet",
      icon: <Tablet size={17} />,
    },
    {
      id: "mobile",
      icon: <Smartphone size={17} />,
    },
  ];

  const handleChangeResponsiveView = (id: SupportedResponsiveViews) => {
    dispatch(setView(id));
  };

  const fetchCampaign = async () => {
    try {
      const campaignData = await getCampaignDocument(popupSlice.campaign_id);
      setCampaign(campaignData);
    } catch (err: any) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Cannot fetch campaign",
        description: err.message,
      });
    }
  };

  const setCampaignActive = async () => {
    setPublishing(true);
    try {
      updatePopup();
      const updatedCampaign = await updateCampaignDocument(campaign.$id, {
        is_active: true,
      });
      fetchCampaign();
      toast({
        title: "Campaign is now live!",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Failed to publish campaign",
        description: err?.message,
      });
    } finally {
      setPublishing(false);
    }
  };

  const updatePopup = async () => {
    toast({
      title: "Saving to the cloud.....",
    });
    try {
      setSaving(true);
      const { id, ...rest } = popupSlice as PopupSliceInterface;

      const updatedPopup = await updatePopupDocument(popupSlice.id, {
        ...rest,
        bg: convertStylesToCSS(popupSlice.bg),
        bg_tablet: convertStylesToCSS(popupSlice.bg_tablet),
        bg_mobile: convertStylesToCSS(popupSlice.bg_mobile),
        title_style: convertStylesToCSS(popupSlice.title_style),
        title_style_tablet: convertStylesToCSS(popupSlice.title_style_tablet),
        title_style_mobile: convertStylesToCSS(popupSlice.title_style_mobile),
        subtitle_style: convertStylesToCSS(popupSlice.subtitle_style),
        subtitle_style_tablet: convertStylesToCSS(
          popupSlice.subtitle_style_tablet
        ),
        subtitle_style_mobile: convertStylesToCSS(
          popupSlice.subtitle_style_mobile
        ),
        button_style: convertStylesToCSS(popupSlice.button_style),
        button_style_tablet: convertStylesToCSS(popupSlice.button_style_tablet),
        button_style_mobile: convertStylesToCSS(popupSlice.button_style_mobile),
        image_style: convertStylesToCSS(popupSlice.image_style),
        image_style_tablet: convertStylesToCSS(popupSlice.image_style_tablet),
        image_style_mobile: convertStylesToCSS(popupSlice.image_style_mobile),
      });

      toast({
        title: "Successfully saved to the cloud",
      });
      setSaving(false);
    } catch (err: any) {
      setSaving(false);
      toast({
        variant: "destructive",
        title: "Can't update to the cloud",
        description: err.message,
      });
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [popupSlice.campaign_id]);

  return (
    <header className="bg-dark p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo />
        <Link
          href={`/space/campaigns/${popupSlice.campaign_id}`}
          className="p-1 rounded-lg px-3 bg-foreground border border-secondary/5"
        >
          <h2 className="text-sm flex items-center select-none gap-3">
            <Link2 size={15} className="rotate-45" />
            {campaign?.name}
          </h2>
        </Link>
      </div>
      <div className="flex responsive-views items-center gap-4 ml-10">
        {reponsive_views.map((view) => (
          <div
            onClick={() => handleChangeResponsiveView(view.id)}
            key={view.id}
            className={`p-2 rounded-md ${
              selectedView === view.id && "bg-secondary/10 text-pink-400"
            } cursor-pointer hover:bg-secondary/10`}
          >
            {view.icon}
          </div>
        ))}
      </div>
      <div className="actions flex items-center gap-5">
        <Button disabled={saving} onClick={updatePopup}>
          <Cloud size={14} className="mr-3" />
          Save {saving && "...."}
        </Button>
        <Link href={"/preview_popup"} target="_blank">
          <Button
            onClick={() => {
              localStorage.setItem("popup_preview", JSON.stringify(popupSlice));
              console.log("preview", popupSlice);
            }}
            variant={"ghost"}
            className="rounded-full bg-foreground border border-secondary/5 w-[40px] h-[40px] p-0"
          >
            <Eye size={16} className="" />
          </Button>
        </Link>
        <Button
          disabled={campaign?.is_active || publishing}
          onClick={setCampaignActive}
          className="bg-orange-500 hover:bg-orange-500/70"
        >
          <Rocket size={14} className="mr-3" />{" "}
          {campaign?.is_active ? "Published" : "Publish"} {publishing && "...."}
        </Button>
      </div>
    </header>
  );
};

export default EditorHeader;
