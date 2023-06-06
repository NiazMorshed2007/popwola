import Logo from "@/components/Logo";
import { convertStylesToCSS } from "@/components/editor/helpers/convertToCssString";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { updatePopupDocument } from "@/lib/services/popup.service";
import { PopupSliceInterface } from "@/redux/slices/popupSlice";
import {
  Cloud,
  CornerUpLeft,
  Eye,
  Link2,
  LoaderIcon,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const EditorHeader = () => {
  const { popupSlice } = usePopupSlice();
  const { toast } = useToast();
  const [saving, setSaving] = useState<boolean>(false);

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
        title_style: convertStylesToCSS(popupSlice.title_style),
        subtitle_style: convertStylesToCSS(popupSlice.subtitle_style),
        button_style: convertStylesToCSS(popupSlice.button_style),
        image_style: convertStylesToCSS(popupSlice.image_style),
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

  return (
    <header className="bg-dark p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo className="w-[35px] h-[35px]" />
        <Link
          href={"/space/campaigns"}
          className="p-1 rounded-lg px-3 bg-foreground border border-secondary/5"
        >
          <h2 className="text-sm flex items-center gap-2">
            <CornerUpLeft size={14} />
            Back to home
          </h2>
        </Link>
      </div>
      <h2 className="text-sm flex items-center select-none gap-3">
        <Link2 size={15} className="rotate-45" />
        {popupSlice.name}
      </h2>
      <div className="actions flex items-center gap-5">
        <Button disabled={saving} onClick={updatePopup}>
          <Cloud size={14} className="mr-3" />
          Save {saving && "...."}
        </Button>
        <Link href={"/preview_popup"} target="_blank">
          <Button
            onClick={() => {
              localStorage.setItem("popup_preview", JSON.stringify(popupSlice));
            }}
            variant={"ghost"}
            className="rounded-full bg-foreground border border-secondary/5 w-[40px] h-[40px] p-0"
          >
            <Eye size={16} className="" />
          </Button>
        </Link>
        <Button className="bg-orange-500 hover:bg-orange-500/70">
          <Rocket size={14} className="mr-3" /> Publish
        </Button>
      </div>
    </header>
  );
};

export default EditorHeader;
