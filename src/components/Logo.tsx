import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

const Logo: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <img
      className={`w-[60px] h-[60px] ${className}`}
      src="/popwola-logo.svg"
      alt=""
    />
  );
};

export default Logo;
