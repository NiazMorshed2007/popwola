"use client";

import { AlignEndHorizontal, Home, Library, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavInterface {
  name: string;
  icon: React.ReactNode;
  link: string;
}

const SidebarNavs: React.FC = () => {
  const pathname: string = usePathname();

  const navs: NavInterface[] = [
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
    <nav className="p-3 py-3 rounded-xl flex flex-col gap-1 bg-foreground">
      {navs.map((nav, i) => (
        <Link
          key={i}
          href={nav.link}
          className={`flex items-center text-sm text-primary/60 transition-all ${
            pathname === nav.link && "bg-dark/80"
          } hover:bg-dark/80 rounded-lg gap-2 p-2 px-2`}
        >
          {nav.icon}
          <span className="text-sm">{nav.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNavs;
