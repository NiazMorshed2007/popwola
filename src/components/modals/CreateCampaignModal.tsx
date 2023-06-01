"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import { createCampaignDocument } from "@/lib/services/campaign.service";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const CreateCampaignModal: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<CampaignInterface>({
    name: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCampaign = await createCampaignDocument(data);
    setData({ name: "", description: "" });
    setOpen(false);
    router.push("/space/campaigns");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium text-xl">
            Create Campaign
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="py-3">
          <div className="mb-4">
            <label className="block mb-2 text-xs text-secondary font-medium">
              Campaign Name <span className="text-red-500">*</span>
            </label>
            <Input
              name="name"
              required
              value={data.name}
              onChange={handleInputChange}
              type="text"
              placeholder="Campaign Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-xs text-secondary font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <Input
              name="description"
              required
              value={data.description}
              onChange={handleInputChange}
              type="text"
              placeholder="Description"
            />
          </div>
          <button className="w-full py-2 px-4 bg-brand hover:bg-brand/90 rounded-md text-white text-sm">
            Create Campaign
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;
