import Logo from "@/components/Logo";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const EditorLoaderSkeleton = () => {
  return (
    <main className="w-screen fixed top-0 left-0 z-[200] h-screen flex flex-col gap-2 bg-foreground">
      <header className="bg-dark h-[70px] py-3 px-7 flex items-center justify-between">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
        <Skeleton className="w-[200px] ml-28 h-[20px] rounded-lg" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-[50px] h-[20px] rounded-lg" />
          <Skeleton className="w-[50px] h-[20px] rounded-lg" />
          <Skeleton className="w-[50px] h-[20px] rounded-lg" />
        </div>
      </header>
      <div
        style={{ height: "calc(100vh - 60px)" }}
        className="w-full items-center justify-center flex p-3"
      >
        <aside className="bg-dark rounded-xl w-[280px] h-full border border-secondary/10">
          <h2 className="border-b bg-foreground text-primary/50 rounded-tl-xl rounded-tr-xl flex items-center gap-2 border-secondary/5 p-4 py-2 text-sm">
            <Skeleton className="w-[70px] h-[15px]" />
          </h2>
          <div className="flex flex-col py-2 gap-1 px-1">
            <div className="flex flex-col py-2 gap-7 px-1">
              <div>
                <Skeleton className="w-[30px] mb-2 h-[10px]" />
                <Skeleton className="w-10/12 h-[20px]" />
              </div>
              <div>
                <Skeleton className="w-[30px] mb-2 h-[10px]" />
                <Skeleton className="w-10/12 mb-2 h-[20px]" />
                <Skeleton className="w-10/12 h-[20px]" />
              </div>
              <div>
                <Skeleton className="w-[30px] mb-2 h-[10px]" />
                <Skeleton className="w-10/12 h-[20px]" />
              </div>{" "}
              <div>
                <Skeleton className="w-[30px] mb-2 h-[10px]" />
                <Skeleton className="w-10/12 h-[20px]" />
              </div>
            </div>
          </div>
        </aside>
        <div
          style={{
            width: "calc(100vw - 540px)",
          }}
          className="main-view flex items-center justify-center"
        >
          <Logo className="animate-pulse" />
        </div>
        <aside
          className="bg-dark rounded-xl w-[300px] overflow-hidden border border-secondary/10"
          style={{ height: "calc(100vh - 110px)" }}
        >
          <h2 className="border-b bg-foreground capitalize text-primary/60 rounded-tl-xl rounded-tr-xl flex items-center gap-2 border-secondary/5 p-4 py-2 text-sm">
            <Skeleton className="w-[70px] h-[15px]" />
          </h2>

          <div className="py-4 h-full pb-7 px-4">
            <Skeleton className="w-full h-[70px]" />
            <div className="my-3 border-y flex flex-col gap-5 border-secondary/5 py-3">
              <div className="flex items-center justify-between">
                <Skeleton className="w-[100px] h-[30px]" />
                <Skeleton className="w-[100px] h-[30px]" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="w-[100px] h-[30px]" />
                <Skeleton className="w-[100px] h-[30px]" />
              </div>
            </div>

            <Skeleton className="w-full h-[70px]" />
            <div className="my-3 border-y flex flex-col gap-5 border-secondary/5 py-3">
              <div className="flex items-center justify-between">
                <Skeleton className="w-[100px] h-[30px]" />
                <Skeleton className="w-[100px] h-[30px]" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="w-[100px] h-[30px]" />
                <Skeleton className="w-[100px] h-[30px]" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default EditorLoaderSkeleton;
