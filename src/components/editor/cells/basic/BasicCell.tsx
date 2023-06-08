import Transform from "./components/Transform";
import WidthHeight from "./components/WidthHeight";

const BasicCell = () => {
  return (
    <div className="group-wrapper w-full mb-3 px-3 flex flex-col gap-3 pb-3 border-b border-secondary/10">
      <Transform />
      <WidthHeight />
    </div>
  );
};

export default BasicCell;
