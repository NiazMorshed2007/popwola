import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteCampaignDocument } from "@/lib/services/campaign.service";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { deletePopupDocument } from "@/lib/services/popup.service";
import Loader from "../Loader";

interface DeleteCampaignModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  campaign_id: string;
  popup_id?: string;
}

const DeleteCampaignModal: React.FC<DeleteCampaignModalProps> = (props) => {
  const { open, setOpen, children, campaign_id, popup_id } = props;

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteCampaign = async () => {
    setLoading(true);
    try {
      const deletedCampaign = await deleteCampaignDocument(campaign_id);
      toast({
        title: "Campaign deleted successfully",
      });
      router.push("/space/campaigns");
      if (popup_id) {
        try {
          const deletedPopup = await deletePopupDocument(popup_id);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err: any) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Cannot delete campaign",
        description: err.message,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[560px]">
        <h1 className="text-xl font-semibold text-red-500">
          Are you sure you want to delete this campaign?
        </h1>
        <p className="text-sm text-secondary font-light">
          This action cannot be undone. Popup and all data associated with this
          campaign will be deleted.
        </p>
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant={"ghost"}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={deleteCampaign}
            variant={"destructive"}
            className=" text-xs"
          >
            {loading && <Loader />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCampaignModal;
