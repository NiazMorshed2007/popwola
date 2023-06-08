"use client";

import { useAppDispatch } from "@/hooks/reduxHooks";
import {
  SupportedNodeTypes,
  selectSelectedNode,
  setNode,
} from "@/redux/slices/nodeSlice";
import { setPopup, setStyle } from "@/redux/slices/popupSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import Moveable from "react-moveable";
import { useSelector } from "react-redux";
import Selecto from "react-selecto";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import Preview from "@/components/editor/preview/Preview";
import { usePathname } from "next/navigation";
import { getPopupDocuemnt } from "@/lib/services/popup.service";
import { PopupInterface } from "@/interfaces/popup.interface";
import { convertCSSToStyles } from "@/components/editor/helpers/stringToCss";
import EditorLoaderSkeleton from "./components/EditorLoaderSkeleton";

const Editor = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch: Dispatch = useAppDispatch();
  const selectedNode = useSelector(selectSelectedNode);
  const { bgStyle } = usePopupSlice();
  const [targets, setTargets] = React.useState<Array<SVGElement | HTMLElement>>(
    []
  );
  const moveableRef = React.useRef<Moveable>(null);
  const selectoRef = React.useRef<Selecto>(null);

  const handleResize = (e: any) => {
    e.target.style.width = e.width + "px";
    e.target.style.height = e.height + "px";
    dispatch(
      setStyle({
        node: selectedNode,
        style: { width: e.width + "px" },
      })
    );
    dispatch(
      setStyle({
        node: selectedNode,
        style: { height: e.height + "px" },
      })
    );
  };

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const popupData: PopupInterface = await getPopupDocuemnt(
          pathname.split("/")[2]
        );
        dispatch(
          setPopup({
            name: popupData.name,
            id: popupData.$id!,
            campaign_id: popupData.campaign_id,
            bg: convertCSSToStyles(popupData.bg),
            title_value: popupData.title_value,
            title_style: convertCSSToStyles(popupData.title_style),
            subtitle_value: popupData.subtitle_value,
            subtitle_style: convertCSSToStyles(popupData.subtitle_style),
            img_url: popupData.img_url,
            image_style: convertCSSToStyles(popupData.image_style),
            button_value: popupData.button_value,
            button_style: convertCSSToStyles(popupData.button_style),
            button_url: popupData.button_url,
          })
        );

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchPopup();
  }, []);

  return (
    <>
      {loading ? (
        <EditorLoaderSkeleton />
      ) : (
        <div className="w-full select-none h-full flex flex-col gap-1 items-center justify-center">
          <h2
            onClick={() => {
              dispatch(setNode({ id: "bg" }));
            }}
            className="w-11/12 text-xs  text-secondary ml-5"
          >
            Popup Bg
          </h2>
          <div id="popup-area" style={bgStyle} className="popup">
            <Moveable
              ref={moveableRef}
              draggable={true}
              linePadding={2}
              // rotatable={true}
              resizable={true}
              // onRotate={(e) => {
              //   e.target.style.rotate = e.rotation + "deg";
              // }}
              onResize={handleResize}
              scalable={true}
              target={targets}
              onClickGroup={(e) => {
                selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
              }}
              onDrag={(e) => {
                dispatch(
                  setStyle({
                    node: selectedNode,
                    style: { transform: e.transform },
                  })
                );
              }}
              onDragGroup={(e) => {
                e.events.forEach((ev) => {
                  ev.target.style.transform = ev.transform;
                });
                e.targets.map((target, i) => {
                  dispatch(
                    setStyle({
                      node: target.id as SupportedNodeTypes,
                      style: { transform: e.events[i].transform },
                    })
                  );
                });
              }}
            ></Moveable>
            <Selecto
              ref={selectoRef}
              dragContainer={"#popup-area"}
              selectableTargets={[".selecto-area .element"]}
              hitRate={0}
              selectByClick={true}
              selectFromInside={false}
              toggleContinueSelect={["shift", "ctrl"]}
              ratio={0}
              onDragStart={(e) => {
                const moveable = moveableRef.current!;
                const target = e.inputEvent.target;

                if (
                  moveable.isMoveableElement(target) ||
                  targets.some((t) => t === target || t.contains(target))
                ) {
                  e.stop();
                }
              }}
              onSelectEnd={(e) => {
                const moveable = moveableRef.current!;

                if (e.selected.length === 1) {
                  dispatch(
                    setNode({ id: e.selected[0].id as SupportedNodeTypes })
                  );
                }
                if (e.isDragStart) {
                  e.inputEvent.preventDefault();

                  moveable.waitToChangeTarget().then(() => {
                    moveable.dragStart(e.inputEvent);
                  });
                }
                setTargets(e.selected);
              }}
            ></Selecto>

            <Preview />
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
