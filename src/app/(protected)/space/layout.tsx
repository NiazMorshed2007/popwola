import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import DashboardHeader from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="p-5 pr-1 py-4 flex w-screen h-screen">
      <Sidebar />
      <div
        style={{
          width: "calc(100% - 240px)",
        }}
        className="h-full"
      >
        <DashboardHeader />
        <ScrollArea
          style={{
            height: "calc(100vh - 55px)",
          }}
          className="w-full"
        >
          <div className="p-7 py-3">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DashboardLayout;
