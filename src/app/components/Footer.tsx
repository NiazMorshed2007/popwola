import Logo from "@/components/Logo";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const preFilledText =
    "Check out Popwola, an awesome project for building and managing popups with no-code editor. Project is created by @niazmorshed_ for @appwrite x @hashnode Hackathon.";

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
        <Link
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            preFilledText
          )}`}
          target="_blank"
        >
          <Twitter size={20} />
        </Link>
        <Link href="https://github.com/NiazMorshed2007/popwola" target="_blank">
          <Github size={20} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
