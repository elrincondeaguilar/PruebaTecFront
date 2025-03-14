import React from "react";

const Skeleton = ({ width, height }: { width: string; height: string }) => {
  return (
    <div
      className="bg-gray-300 animate-pulse rounded-md"
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
