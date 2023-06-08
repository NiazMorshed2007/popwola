import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div
      id="product"
      className="banner overflow-hidden px-[5%] relative pt-48 pb-20 p-container w-screen md:min-h-screen flex flex-col items-center justify-center"
    >
      <div className="shape1 -z-10"></div>
      <div className="shape2 -z-10"></div>
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <div className="left w-full md:w-1/2">
          <h1 className="title capitalize relative mb-3 text-4xl sm:text-5xl md:text-6xl leading-snug font-semibold">
            Meet <span className="text-brand">Popwola</span>, your no-code popup
            builder.
          </h1>
          <p className="relative text-base md:text-lg text-slate-400/80 mb-4">
            Introducing Popwola: Effortlessly create captivating, no-code popups
            to boost user engagement and drive conversions. Say goodbye to
            overwork and hello to powerful, customizable popups with Popwola.
          </p>
          <div className="button flex items-center gap-6">
            <Link href="/login">
              <Button className="text-sm p-3 px-6 rounded-full">
                Get Started!
              </Button>
            </Link>
            <Link
              target="_blank"
              href="https://github.com/NiazMorshed2007/popwola"
            >
              <Button className="flex items-center gap-2 bg-pink-800 rounded-full p-3 px-8 hover:bg-pink-600/80">
                <Github size={20} /> Star on Github
              </Button>
            </Link>
          </div>
        </div>
        <div className="right w-full md:w-1/2 h-full flex items-center mt-7 md:mt-0 justify-center md:justify-end">
          <iframe
            className="w-full md:w-9/12 rounded-lg shadow-2xl shadow-brand/50 h-60 md:h-[240px]"
            src="https://www.youtube.com/embed/bMh8tO7KtlE"
            title="Meet Popwola | Your No-code popup Builder"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <img
        className="border mt-28 shadow-brand/10 border-secondary/10 shadow-2xl relative rounded-xl border-dark w-full md:w-10/12"
        src="/product-preview.svg"
        alt=""
      />
    </div>
  );
};

export default HeroSection;
