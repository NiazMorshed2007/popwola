import Logo from "@/components/Logo";
import {
  AlignEndHorizontal,
  Github,
  Home,
  Library,
  Settings,
  Twitter,
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
