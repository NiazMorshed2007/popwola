import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ElementItem: React.FC<Props> = (props) => {
  const { icon, children, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={`flex items-center text-sm cursor-pointer border border-dark transition-all hover:bg-foreground rounded-lg gap-2 p-2 px-2 ${className}`}
    >
      {icon}
      <span className="text-sm">{children}</span>
    </div>
  );
};

export default ElementItem;
