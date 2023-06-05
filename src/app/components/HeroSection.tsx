import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div
      id="product"
      className="banner overflow-hidden px-[5%] relative pt-48 pb-20 p-container w-screen md:min-h-screen flex flex-col items-center justify-center"
    >
      {/* <div className="shape1 -z-10"></div>
      <div className="shape2 -z-10"></div> */}
      <div className="flex items-center justify-between">
        <div className="left w-1/2">
          <h1 className="title capitalize relative mb-3 text-[38px] sm:text-[43px] md:text-[50px] leading-snug font-semibold">
            No-code popup builder for your website
          </h1>
          <p className="relative text-[16px] mb-4 sm:text-lg md:text-lg text-slate-400/80">
            A headless CMS with real-time collaboration, and powerful APIs.
            Endless offers unparalleled flexibility and scalability for
            businesses of all sizes. Take your content strategy to the next
            level with Endless
          </p>
          <Link href={"/login"}>
            <Button className="text-sm p-3 px-6 rounded-full">
              Get Started!
            </Button>
          </Link>
        </div>
        <div className="right w-1/2">
          <img src="/product-preview-sm.svg" alt="" />
        </div>
      </div>

      <img
        className="border mt-28 shadow-brand/10 border-secondary/10 shadow-2xl relative rounded-xl border-dark w-10/12"
        src="/product-preview.svg"
        alt=""
      />
    </div>
  );
};

export default HeroSection;
