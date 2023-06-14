"use client";

import DeleteCampaignModal from "@/components/modals/DeleteCampaignModal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import {
  createCampaignDocument,
  updateCampaignDocument,
} from "@/lib/services/campaign.service";
import { userId } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface CampaignFormProps {
  isCreating: boolean;
  initialData?: CampaignInterface;
}

const CampaignForm: React.FC<CampaignFormProps> = ({
  isCreating,
  initialData,
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const [data, setData] = useState<CampaignInterface>(
    isCreating
      ? {
          name: "",
          description: "",
          is_recurring: false,
          popup_id: "",
          is_active: false,
        }
      : initialData!
  );

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<any>(
    isCreating ? undefined : new Date(initialData?.start_date!)
  );
  const [endDate, setEndDate] = useState<any>(
    isCreating ? undefined : new Date(initialData?.end_date!)
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateCampaign = async () => {
    setLoading(true);

    try {
      const updatedCampaign = await updateCampaignDocument(data.$id!, {
        name: data.name,
        description: data.description,
        is_recurring: data.is_recurring,
        popup_id: data.popup_id,
        is_active: data.is_active,
        start_date: startDate,
        end_date: endDate,
      });

      setLoading(false);
      toast({
        title: "Campaign updated",
      });
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Cannot update campaign",
        description: err.message,
      });
    }
  };

  const handleCreateCampaign = async () => {
    setLoading(true);
    try {
      const newCampaign: any = await createCampaignDocument({
        ...data,
        is_active: false,
        user_id: userId(),
        start_date: new Date(startDate),
        end_date: new Date(endDate),
      });
      setData({
        name: "",
        description: "",
        is_recurring: false,
        popup_id: "",
        is_active: false,
      });
      toast({
        title: "Campaign Created",
      });
      setLoading(false);
      router.push(`/space/campaigns/${newCampaign.$id}?template=true`);
    } catch (err: any) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Cannot create campaign",
        description: err.message,
      });
      setLoading(false);
    }
  };

  const handleDateSelect = (
    date: Date,
    setFunction: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const currentDate = new Date(date);

    currentDate.setHours(new Date().getHours());
    currentDate.setMinutes(new Date().getMinutes());
    currentDate.setSeconds(new Date().getSeconds());
    setFunction(currentDate);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isCreating) {
          handleCreateCampaign();
        } else {
          handleUpdateCampaign();
        }
      }}
      className="mt-7 w-9/12"
    >
      <div className="mb-4">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Campaign Name <span className="text-red-500">*</span>
        </label>
        <Input
          value={data.name}
          onChange={handleInputChange}
          required
          name="name"
          type="text"
          placeholder="Campaign Name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Campaign Description <span className="text-red-500">*</span>
        </label>
        <Textarea
          name="description"
          value={data.description}
          onChange={handleInputChange}
          required
          placeholder="Campaign Description"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Start Date <span className="text-red-500">*</span>
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start border-secondary/5 bg-foreground text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? (
                format(startDate, "PPP")
              ) : (
                <span className="text-secondary">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              required
              mode="single"
              selected={startDate}
              onSelect={(date) => handleDateSelect(date!, setStartDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-xs text-secondary font-medium">
          End Date <span className="text-red-500">*</span>
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start border-secondary/5 bg-foreground text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? (
                format(endDate, "PPP")
              ) : (
                <span className="text-secondary">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              required
              mode="single"
              selected={endDate}
              onSelect={(date) => handleDateSelect(date!, setEndDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Is active? <span className="text-red-500">*</span>
        </label>
        <Select
          disabled={isCreating && !data.is_active}
          defaultValue={!data.is_active ? "no" : "yes"}
          required
          onValueChange={(e: string) => {
            setData((prev) => ({ ...prev, is_active: e === "yes" }));
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={<span className="text-secondary">Yes/No</span>}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="buttons-wrapper flex items-center justify-end gap-3">
        {isCreating && (
          <Link href={"/space/campaigns"}>
            <Button variant={"destructive"}>Cancel</Button>
          </Link>
        )}
        {data && !isCreating && (
          <DeleteCampaignModal
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            campaign_id={data.$id!}
            popup_id={data?.popup_id}
          >
            <div className={buttonVariants({ variant: "destructive" })}>
              <TrashIcon size={14} className="mr-2" /> Delete Campaign
            </div>
          </DeleteCampaignModal>
        )}
        <Button disabled={loading}>
          {loading && <Loader size={13} className="animate-spin mr-2" />}{" "}
          {isCreating ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default CampaignForm;
