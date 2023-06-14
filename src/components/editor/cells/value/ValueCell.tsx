import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { updatePopupDocument } from "@/lib/services/popup.service";
import { uploadImage } from "@/lib/services/storage.service";
import { setUrl, setValue } from "@/redux/slices/popupSlice";
import { ChangeEvent } from "react";

const ValueCell: React.FC = () => {
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
      case "button":
        return popupSlice.button_value;
      default:
        return "";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setValue({ node: selectedNode, value: e.target.value }));
  };

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    toast({
      title: "Uploading image...",
    });
    const file = await uploadImage(selectedFile as File);
    const file_url: string = `${process.env.NEXT_PUBLIC_CLOUD_URL}/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}&mode=admin`;
    dispatch(setValue({ node: selectedNode, value: file_url }));
    const updateImageOnStore = await updatePopupDocument(popupSlice.id, {
      img_url: file_url,
    });
    toast({
      title: "Image uploaded & stored on cloud successfully",
      description: "Pulling the image from cloud...",
    });
  };

  const handleButtonUrl = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl({ node: selectedNode, url: e.target.value }));
  };

  return (
    <div className="group-wrapper mb-3 px-3 pb-3 border-b border-secondary/10">
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

      {selectedNode === "button" && (
        <>
          <p className="text-xs mb-2 mt-4 text-secondary">Button Link</p>
          <Input
            value={popupSlice.button_url}
            onChange={handleButtonUrl}
            placeholder="example.com"
          />
        </>
      )}
    </div>
  );
};

export default ValueCell;
