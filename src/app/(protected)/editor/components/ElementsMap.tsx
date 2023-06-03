"use client";

import ElementItem from "@/components/modals/ElementItem";
import { CircleDot, FileType, Image, Layers, ListTree } from "lucide-react";

const ElementsMap = () => {
  return (
    <aside className="bg-dark rounded-xl w-[280px] h-full border border-secondary/10">
      <h2 className="border-b bg-foreground text-primary/60 rounded-tl-xl rounded-tr-xl flex items-center gap-2 border-secondary/5 p-4 py-2 text-sm">
        <ListTree size={15} />
        Groups
      </h2>
      <div className="flex flex-col py-2 gap-1 px-1">
        <ElementItem className="mb-4" icon={<Layers size={14} />}>
          Popup Bg
        </ElementItem>

        <div className="group-wrapper mb-3">
          <p className="text-xs px-3 mb-2 text-secondary">Text</p>
          <div className="pl-3">
            <ElementItem icon={<FileType size={14} />}>Title</ElementItem>
            <ElementItem icon={<FileType size={14} />}>Sub Title</ElementItem>
            <ElementItem icon={<FileType size={14} />}>Description</ElementItem>
          </div>
        </div>

        <div className="group-wrapper mb-3">
          <p className="text-xs px-3 mb-2 text-secondary">Media</p>
          <div className="pl-3">
            <ElementItem icon={<Image size={14} />}>Image</ElementItem>
            {/* <ElementItem icon={<Video size={14} />}>Video</ElementItem> */}
          </div>
        </div>

        <div className="group-wrapper mb-3">
          <p className="text-xs px-3 mb-2 text-secondary">Components</p>
          <div className="pl-3">
            <ElementItem icon={<CircleDot size={14} />}>Button</ElementItem>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ElementsMap;
