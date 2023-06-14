"use client";

import { convertCSSToStyles } from "@/components/editor/helpers/stringToCss";
import Preview from "@/components/editor/preview/Preview";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { useSelectedView } from "@/hooks/selectedViewHook";
import { PopupInterface } from "@/interfaces/popup.interface";
import { getPopupDocuemnt } from "@/lib/services/popup.service";
import { SupportedNodeTypes, setNode } from "@/redux/slices/nodeSlice";
import { setPopup, setStyle } from "@/redux/slices/popupSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import EditorLoaderSkeleton from "./components/EditorLoaderSkeleton";

const Editor: React.FC = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch: Dispatch = useAppDispatch();
  const selectedNode = useSelectedNode();
  const selectedView = useSelectedView();
  const { bgStyle } = usePopupSlice();
  const [targets, setTargets] = useState<Array<SVGElement | HTMLElement>>([]);
  const moveableRef = useRef<Moveable>(null);
  const selectoRef = useRef<Selecto>(null);

  const handleResize = (e: any) => {
    e.target.style.width = e.width + "px";
    e.target.style.height = e.height + "px";
    dispatch(
      setStyle({
        node: selectedNode,
        view: selectedView,
        style: { width: e.width + "px" },
      })
    );
    dispatch(
      setStyle({
        node: selectedNode,
        view: selectedView,
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
            bg_tablet: convertCSSToStyles(popupData.bg_tablet),
            bg_mobile: convertCSSToStyles(popupData.bg_mobile),
            title_value: popupData.title_value,
            title_style: convertCSSToStyles(popupData.title_style),
            title_style_tablet: convertCSSToStyles(
              popupData.title_style_tablet
            ),
            title_style_mobile: convertCSSToStyles(
              popupData.title_style_mobile
            ),
            subtitle_value: popupData.subtitle_value,
            subtitle_style: convertCSSToStyles(popupData.subtitle_style),
            subtitle_style_tablet: convertCSSToStyles(
              popupData.subtitle_style_tablet
            ),
            subtitle_style_mobile: convertCSSToStyles(
              popupData.subtitle_style_mobile
            ),
            img_url: popupData.img_url,
            image_style: convertCSSToStyles(popupData.image_style),
            image_style_tablet: convertCSSToStyles(
              popupData.image_style_tablet
            ),
            image_style_mobile: convertCSSToStyles(
              popupData.image_style_mobile
            ),
            button_value: popupData.button_value,
            button_style: convertCSSToStyles(popupData.button_style),
            button_style_tablet: convertCSSToStyles(
              popupData.button_style_tablet
            ),
            button_style_mobile: convertCSSToStyles(
              popupData.button_style_mobile
            ),
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
        <div className="select-none h-full flex flex-col gap-1 items-center justify-center">
          <div>
            <h2
              onClick={() => {
                dispatch(setNode({ id: "bg" }));
              }}
              className="text-xs  text-secondary mb-2"
            >
              Popup Bg
            </h2>
            <div id="popup-area" style={bgStyle} className="popup">
              <Moveable
                ref={moveableRef}
                draggable
                resizable
                onResize={handleResize}
                target={targets}
                onClickGroup={(e) => {
                  selectoRef.current?.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onDrag={(e) => {
                  dispatch(
                    setStyle({
                      node: selectedNode,
                      view: selectedView,
                      style: { transform: e.transform },
                    })
                  );
                }}
                onDragGroup={(e) => {
                  e.events.forEach((ev) => {
                    ev.target.style.transform = ev.transform;
                  });
                  e.targets.forEach((target, i) => {
                    dispatch(
                      setStyle({
                        node: target.id as SupportedNodeTypes,
                        view: selectedView,
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
                selectByClick
                selectFromInside={false}
                toggleContinueSelect={["shift", "ctrl"]}
                ratio={0}
                onDragStart={(e) => {
                  const moveable = moveableRef.current;
                  const target = e.inputEvent.target;
                  if (
                    moveable?.isMoveableElement(target) ||
                    targets.some((t) => t === target || t.contains(target))
                  ) {
                    e.stop();
                  }
                }}
                onSelectEnd={(e) => {
                  const moveable = moveableRef.current;
                  if (e.selected.length === 1) {
                    dispatch(
                      setNode({ id: e.selected[0].id as SupportedNodeTypes })
                    );
                  }
                  if (e.isDragStart) {
                    e.inputEvent.preventDefault();
                    moveable?.waitToChangeTarget().then(() => {
                      moveable?.dragStart(e.inputEvent);
                    });
                  }
                  setTargets(e.selected);
                }}
              ></Selecto>
              <Preview />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
