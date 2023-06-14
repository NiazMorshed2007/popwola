import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
}

const Logo: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <Image
      width="0"
      height="0"
      sizes="100vw"
      className={`w-[50px] h-[50px] ${className}`}
      src="/popwola-logo.svg"
      alt="logo"
    />
  );
};

export default Logo;
