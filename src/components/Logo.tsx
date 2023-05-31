import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

const Logo: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <Link href={"/"}>
      <img
        className={`w-[53px] h-[53px] ${className}`}
        src="https://app.spline.design/static/media/spline_logo.95327944.png"
        alt=""
      />
    </Link>
  );
};

export default Logo;
