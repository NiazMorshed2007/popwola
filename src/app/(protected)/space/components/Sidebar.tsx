import Logo from "@/components/Logo";
import {
  AlignEndHorizontal,
  Home,
  Library,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const navs = [
    {
      name: "Dashboard",
      icon: <Home size={14} />,
      link: "/space",
    },
    {
      name: "Campaigns",
      icon: <AlignEndHorizontal size={14} />,
      link: "/space/campaigns",
    },
    {
      name: "Settings",
      icon: <Settings size={14} />,
      link: "/space/settings",
    },
    {
      name: "Profile",
      icon: <User size={14} />,
      link: "/space/profile",
    },
    {
      name: "Template Library",
      icon: <Library size={14} />,
      link: "/space/template-library",
    },
  ];
  return (
    <aside className="h-full w-[240px] flex flex-col justify-between">
      <div className="top">
        <Logo className="w-[40px] mb-8 h-[40px]" />
        <nav className="p-3 py-3 rounded-xl flex flex-col gap-1 bg-foreground">
          {navs.map((nav, i) => (
            <Link
              key={i}
              href={nav.link}
              className={`flex items-center text-sm text-primary/60 transition-all hover:bg-dark/80 rounded-lg gap-2 p-2 px-2`}
            >
              {nav.icon}
              <span className="text-sm">{nav.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      {/* <div className="bottom p-4 bg-foreground rounded-xl">
        <p className="text-sm">Love the project?</p>
      </div> */}
    </aside>
  );
};

export default Sidebar;
