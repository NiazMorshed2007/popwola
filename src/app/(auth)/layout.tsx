import Logo from "@/components/Logo";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="w-screen h-screen flex items-center relative">
      <div className="absolute top-5 left-5 z-20">
        <Logo />
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
