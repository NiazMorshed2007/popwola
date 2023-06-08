import Logo from "@/components/Logo";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center flex-wrap py-3 border-t border-secondary/10 justify-between mx-[5%]">
      <p>
        Built by{" "}
        <Link
          className=" underline text-brand"
          href={"https://github.com/NiazMorshed2007"}
        >
          Niaz Moshed
        </Link>
      </p>
      <h2>Proudly Open Source</h2>
      <div className="flex items-center gap-7">
        <p className="text-xs">Share:</p>
        <Twitter size={20} />
        <Github size={20} />
        <Linkedin size={20} />
      </div>
    </footer>
  );
};

export default Footer;
