"use client";

import { useAppDispatch } from "@/hooks/reduxHooks";
import {
  SupportedNodeTypes,
  selectSelectedNode,
  setNode,
} from "@/redux/slices/nodeSlice";
import { setStyle } from "@/redux/slices/popupSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import Moveable from "react-moveable";
import { useSelector } from "react-redux";
import Selecto from "react-selecto";
import Preview from "../../../components/editor/preview/Preview";

const Editor = () => {
  const dispatch: Dispatch = useAppDispatch();
  const selectedNode = useSelector(selectSelectedNode);

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

  return (
    <div className="w-full select-none h-full flex flex-col gap-1 items-center justify-center">
      <h2
        onClick={() => {
          dispatch(setNode({ id: "bg" }));
        }}
        className="w-11/12 text-xs  text-secondary ml-5"
      >
        Popup Bg
      </h2>
      <div
        id="popup-area"
        style={{
          width: "700px",
          height: "400px",
        }}
        className="popup overflow-hidden bg-white rounded-xl relative"
      >
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
              dispatch(setNode({ id: e.selected[0].id as SupportedNodeTypes }));
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
  );
};

export default Editor;
