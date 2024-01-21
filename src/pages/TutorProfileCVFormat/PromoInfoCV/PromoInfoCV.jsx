import React, { useState } from "react";
import Videos from "../../../components/Shared/PromoInfo/VideoComponent/Videos/Videos";
import Images from "../../../components/Shared/PromoInfo/ImageComponent/Images/Images";

const PromoInfoCV = ({ promoInfo, isLoading }) => {
  const [activeTab, setActiveTab] = useState("video");
  return (
    <div className=" bg-[#f1f5f9]">
      <div className="w-full rounded-md grid grid-cols-1">
        <div className="flex gap-5 md:gap-10 px-5 pt-5 border-0 border-b-[1px] border-gray-200 bg-white">
          <div
            className="pb-3 relative cursor-pointer"
            onClick={() => setActiveTab("video")}
          >
            <p className="font-semibold text-gray-700 ">Video</p>
            {activeTab === "video" && (
              <div className="h-1 w-11 bg-primary absolute top-[88%] rounded-t-full"></div>
            )}
          </div>
          <div
            className="pb-3 relative cursor-pointer"
            onClick={() => setActiveTab("photo")}
          >
            <p className="font-semibold text-gray-700 ">Photos</p>
            {activeTab === "photo" && (
              <div className="h-1 w-14 bg-primary absolute top-[88%] rounded-t-full"></div>
            )}
          </div>
        </div>
        <div className="p-5 bg-white">
          {activeTab === "video" && (
            <Videos isLoading={isLoading} videos={promoInfo?.videoGallery} />
          )}
          {activeTab === "photo" && (
            <Images isLoading={isLoading} images={promoInfo?.mediaGallery} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoInfoCV;
