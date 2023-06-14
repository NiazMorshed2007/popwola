"use client";

import React from "react";
import EditorHeader from "./[id]/components/EditorHeader";
import ElementsMap from "./[id]/components/ElementsMap";
import PropertiesSidebar from "./[id]/components/propertiesSidebar/PropertiesSidebar";

interface Props {
  children: React.ReactNode;
}

const EditorLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="w-screen h-screen flex flex-col gap-2 bg-foreground">
      <EditorHeader />
      <div style={{ height: "calc(100vh - 60px)" }} className="w-full flex p-3">
        <ElementsMap />
        <div
          style={{
            width: "calc(100vw - 540px)",
          }}
          className="main-view"
        >
          {children}
        </div>
        <PropertiesSidebar />
      </div>
    </main>
  );
};

export default EditorLayout;
