import Logo from "@/components/Logo";
import { Github, Twitter } from "lucide-react";
import SidebarNavs from "./SidebarNavs";

const Sidebar = () => {
  return (
    <aside className="h-full w-[240px] flex flex-col justify-between">
      <div className="top">
        <Logo className="w-[40px] mb-8 h-[40px]" />
        <SidebarNavs />
      </div>
      <div className="bottom p-4 bg-foreground rounded-xl">
        <p className="text-sm text-center text-secondary/70">
          Love the project? 💖
        </p>
        <p className="text-center text-xs text-secondary">
          Leave a star / tweet on social
        </p>
        <div className="mt-6 flex justify-center items-center gap-7">
          <Github
            size={20}
            className="text-secondary hover:text-secondary/70 transition-all"
          />
          <Twitter
            size={20}
            className="text-secondary hover:text-secondary/70 transition-all"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
