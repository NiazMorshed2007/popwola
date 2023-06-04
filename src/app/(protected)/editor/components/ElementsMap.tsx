"use client";

import ElementItem from "@/components/modals/ElementItem";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { SupportedNodeTypes, setNode } from "@/redux/slices/nodeSlice";
import { CircleDot, FileType, Image, Layers, ListTree } from "lucide-react";
import React from "react";

interface GroupMap {
  group_name: "popup" | "text" | "media" | "components";
  elems: IElementMap[];
}

interface IElementMap {
  icon: React.ReactNode;
  id: SupportedNodeTypes;
  title: string;
}

const ElementsMap = () => {
  const selectedNode = useSelectedNode();
  const dispatch = useAppDispatch();
  const elementsMap: GroupMap[] = [
    {
      group_name: "popup",
      elems: [
        {
          icon: <Layers size={15} />,
          id: "bg",
          title: "Popup bg",
        },
      ],
    },
    {
      group_name: "text",
      elems: [
        {
          icon: <FileType size={14} />,
          id: "title",
          title: "Title",
        },
        {
          icon: <FileType size={14} />,
          id: "subtitle",
          title: "Subtitle",
        },
      ],
    },
    {
      group_name: "media",
      elems: [
        {
          icon: <Image size={14} />,
          id: "image",
          title: "Image",
        },
      ],
    },
    {
      group_name: "components",
      elems: [
        {
          icon: <CircleDot size={14} />,
          id: "title", //TODO: add button as supported type
          title: "Button",
        },
      ],
    },
  ];
  return (
    <aside className="bg-dark rounded-xl w-[280px] h-full border border-secondary/10">
      <h2 className="border-b bg-foreground text-primary/60 rounded-tl-xl rounded-tr-xl flex items-center gap-2 border-secondary/5 p-4 py-2 text-sm">
        <ListTree size={15} />
        Groups
      </h2>
      <div className="flex flex-col py-2 gap-1 px-1">
        <div className="flex flex-col py-2 gap-1 px-1">
          {elementsMap.map((group) => (
            <div key={group.group_name} className="group-wrapper mb-3">
              <p className="text-xs capitalize px-3 mb-2 text-secondary">
                {group.group_name}
              </p>
              <div className="pl-3">
                {group.elems.map((element) => (
                  <ElementItem
                    className={`${
                      selectedNode === element.id &&
                      "bg-foreground border-secondary"
                    }`}
                    onClick={() => {
                      dispatch(setNode({ id: element.id }));
                    }}
                    key={element.id}
                    icon={element.icon}
                  >
                    {element.title}
                  </ElementItem>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ElementsMap;
