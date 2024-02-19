import React, { useState } from "react";

import { Link } from "react-router-dom";
import Videos from "../../../../../components/Shared/PromoInfo/VideoComponent/Videos/Videos";
import Images from "../../../../../components/Shared/PromoInfo/ImageComponent/Images/Images";
import { useGetTutorMediaGalleryQuery } from "../../../../../store/service/tutorInfo/mediaGallery/mediaGallery";

const PromoInfo = ({ number }) => {
  const [activeTab, setActiveTab] = useState("video");

  const { data: mediaGalleryData, isLoading } =
    useGetTutorMediaGalleryQuery(number);
  const mediaGallery = mediaGalleryData?.data;

  let combinedVideoGallery = [];

  mediaGallery?.forEach((obj) => {
    let videoGallery = obj.videoGallery;
    videoGallery.forEach((item) => {
      let newItem = { ...item };
      newItem.type = obj.type;
      combinedVideoGallery.push(newItem);
    });
  });

  let combinedMediaGallery = [];

  mediaGallery?.forEach((obj) => {
    let mediaGallery = obj.mediaGallery;
    mediaGallery.forEach((item) => {
      let newItem = { ...item };
      newItem.type = obj.type;
      combinedMediaGallery.push(newItem);
    });
  });

  return (
    <div className="bg-white  my-10">
      <div className="">
        <div className="shadow-md rounded-lg">
          <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
            <div>
              <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                Promo Info
              </h2>
            </div>
            <div>
              <Link
                to={`/edit/promo-info/${number}`}
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="px-5 py-5 bg-[#f1f5f9]">
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
                  <Videos isLoading={isLoading} videos={combinedVideoGallery} />
                )}
                {activeTab === "photo" && (
                  <Images isLoading={isLoading} images={combinedMediaGallery} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoInfo;
