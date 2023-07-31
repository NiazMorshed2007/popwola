import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import a from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed w-full top-0 bg-foreground/40 z-40 backdrop-blur-md py-2 flex items-center justify-between px-[5%]">
      <Logo />
      <div className="buttons-wrapper text-sm flex items-center gap-6">
        <a href={"/login"}>Login</a>
        <a href={"/signup"}>
          <Button className="p-2 px-6 text-sm rounded-full">Get Started</Button>
        </a>
      </div>
    </header>
  );
};

export default Header;
