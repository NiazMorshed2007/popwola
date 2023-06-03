"use client";
import React from "react";
import ElementsMap from "./components/ElementsMap";
import PropertiesSidebar from "./components/propertiesSidebar/PropertiesSidebar";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Cloud, CornerUpLeft, Eye, Rocket, Link2 } from "lucide-react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const EditorLayout: React.FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <main className="w-screen h-screen flex flex-col gap-2 bg-foreground">
        <header className="bg-dark p-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="w-[35px] h-[35px]" />
            <Link
              href={"/space/campaigns"}
              className="p-1 rounded-lg px-3 bg-foreground border border-secondary/5"
            >
              <h2 className="text-sm flex items-center gap-2">
                <CornerUpLeft size={14} />
                Back to home
              </h2>
            </Link>
          </div>
          <h2 className="text-sm flex items-center select-none gap-3">
            <Link2 size={15} className="rotate-45" />
            Coupon Campaign
          </h2>
          <div className="actions flex items-center gap-5">
            <Button>
              <Cloud size={14} className="mr-3" />
              Save
            </Button>
            <Button
              variant={"ghost"}
              className="rounded-full bg-foreground border border-secondary/5 w-[40px] h-[40px] p-0"
            >
              <Eye size={16} className="" />
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-500/70">
              <Rocket size={14} className="mr-3" /> Publish
            </Button>
          </div>
        </header>
        <div
          style={{ height: "calc(100vh - 60px)" }}
          className="w-full flex p-3"
        >
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
    </Provider>
  );
};

export default EditorLayout;
