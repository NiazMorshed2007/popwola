import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  children: React.ReactNode;
}

const CreateCampaignModal: React.FC<Props> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium text-xl">
            Create Campaign
          </DialogTitle>
        </DialogHeader>
        <form className="py-3">
          <div className="mb-4">
            <label className="block mb-2 text-xs text-secondary font-medium">
              Campaign Name <span className="text-red-500">*</span>
            </label>
            <Input type="email" placeholder="Email" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-xs text-secondary font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <Input type="password" placeholder="Password" />
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
