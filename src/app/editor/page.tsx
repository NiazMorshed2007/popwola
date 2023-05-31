import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Editor = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        style={{
          width: "700px",
          height: "400px",
        }}
        className="popup bg-white rounded-xl flex overflow-hidden items-center justify-between"
      ></div>
    </div>
  );
};

export default Editor;
