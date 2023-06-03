"use client";

import React, { FormEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import { createCampaignDocument } from "@/lib/services/campaign.service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";

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
        }
      : initialData!
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateCampaign = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newCampaign: any = await createCampaignDocument(data);
      setData({ name: "", description: "" });
      toast({
        title: "Campaign Created",
      });
      setLoading(false);
      router.push(`/space/campaigns/${newCampaign.$id}`);
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

  return (
    <form onSubmit={handleCreateCampaign} className="mt-7 w-9/12">
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

      {/* <div className="mb-4">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Start Date <span className="text-red-500">*</span>
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span className="text-secondary">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              required
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div> */}
      <div className="mb-4">
        <label className="block mb-2 text-xs text-secondary font-medium">
          Is recurring? <span className="text-red-500">*</span>
        </label>
        <Select required>
          <SelectTrigger className="w-full">
            <SelectValue className="text-secondary" placeholder="Yes/No" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="buttons-wrapper flex items-center justify-end gap-3">
        <Button variant={"destructive"}>Cancel</Button>
        {isCreating ? (
          <Button disabled={loading}>Create</Button>
        ) : (
          <Button>Update</Button>
        )}
      </div>
    </form>
  );
};

export default CampaignForm;
