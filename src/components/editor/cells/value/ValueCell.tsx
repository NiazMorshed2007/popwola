"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { getPreviewImage, uploadImage } from "@/lib/services/storage.service";
import { setValue } from "@/redux/slices/popupSlice";
import React from "react";

const ValueCell = () => {
  const selectedNode = useSelectedNode();
  const { popupSlice } = usePopupSlice();
  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const conditionalValue = (): string => {
    switch (selectedNode) {
      case "title":
        return popupSlice.title_value;
      case "subtitle":
        return popupSlice.subtitle_value;
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setValue({ node: selectedNode, value: e.target.value }));
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    toast({
      title: "Uploaidng image...",
    });
    const file = await uploadImage(selectedFile as File);
    const file_url: string = `${process.env.NEXT_PUBLIC_CLOUD_URL}/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}&mode=admin`;
    dispatch(setValue({ node: selectedNode, value: file_url }));
    toast({
      title: "Image uploaded successfully",
    });
  };

  return (
    <div className="group-wrapper mb-3 px-3 pb-3 border-b border-secondary/10">
      <div>
        {selectedNode !== "bg" && (
          <>
            {selectedNode === "image" ? (
              <>
                <p className="text-xs mb-2 text-secondary">Popup Image</p>
                <div className="flex items-center gap-3 pt-3">
                  <img
                    src={popupSlice.img_url}
                    className="w-[60px] h-[70px] object-cover rounded-md border border-secondary/10"
                    alt=""
                  />
                  <Input id="picture" type="file" onChange={handleFileSelect} />
                </div>
              </>
            ) : (
              <>
                <p className="text-xs mb-2 text-secondary">Value</p>

                <Textarea
                  value={conditionalValue()}
                  onChange={handleChange}
                  placeholder="Enter value..."
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ValueCell;
