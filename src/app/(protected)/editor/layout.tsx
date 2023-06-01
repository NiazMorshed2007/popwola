import React from "react";
import ElementsMap from "./components/ElementsMap";
import PropertiesSidebar from "./components/PropertiesSidebar";

interface Props {
  children: React.ReactNode;
}

const EditorLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="w-screen h-screen p-3 flex gap-6 bg-foreground">
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
    </main>
  );
};

export default EditorLayout;
