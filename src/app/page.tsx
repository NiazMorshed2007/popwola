import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <Logo />
      <h1>Hey! You&apos;re on the home</h1>
      <Link href={"/signup"}>
        <button className="bg-gray-600 px-10">go</button>
      </Link>
    </div>
  );
};

export default Home;
