"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setNode } from "@/redux/slices/nodeSlice";
import { PopupSliceInterface } from "@/redux/slices/popupSlice";
import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";

const Editor = () => {
  const dispatch: Dispatch = useAppDispatch();
  const popupSlice: PopupSliceInterface = useAppSelector(
    (state) => state.popup
  );

  const [targets, setTargets] = React.useState<Array<SVGElement | HTMLElement>>(
    []
  );
  const moveableRef = React.useRef<Moveable>(null);
  const selectoRef = React.useRef<Selecto>(null);

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
          rotatable={true}
          resizable={true}
          onClick={(e) => {}}
          onRotate={(e) => {
            e.target.style.transform = e.transform;
          }}
          onResize={(e) => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
          }}
          scalable={true}
          target={targets}
          onClickGroup={(e) => {
            selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
          }}
          onDrag={(e) => {
            e.target.style.transform = e.transform;
          }}
          onDragGroup={(e) => {
            e.events.forEach((ev) => {
              ev.target.style.transform = ev.transform;
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
          toggleContinueSelect={["shift"]}
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
              dispatch(setNode({ id: e.selected[0].id }));
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

        <div className="elements text-black relative selecto-area">
          <h1
            style={JSON.parse(popupSlice.title_style)}
            id="title"
            className="element text-2xl font-semibold"
          >
            {popupSlice.title_value}
          </h1>
          <p className="element" id="subtitle">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
            perspiciatis fuga nisi officiis eveniet eum tempora? Perferendis
            quibusdam consequatur repudiandae
          </p>
          <img
            id="image"
            className="element"
            src="https://cdn.dribbble.com/userupload/4160413/file/original-7f17f8eb041c03c556033cf057a648f9.png?compress=1&resize=1024x768"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
