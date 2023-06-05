import Logo from "@/components/Logo";
import React from "react";

const Header = () => {
  return (
    <header className="fixed w-full top-0 bg-foreground/40 z-40 backdrop-blur-md py-4 flex items-center justify-between px-[5%]">
      <Logo />
    </header>
  );
};

export default Header;
