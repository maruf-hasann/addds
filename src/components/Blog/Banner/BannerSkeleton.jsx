import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="animate-pulse   p-4 rounded-md mt-5 h-full relative bottom-8">
      <div className="h-[215px] bg-gray-200 rounded-md mb-4"></div>
      <div className="h-[215px] bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default BannerSkeleton;
