import React from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";

const PromoInfo = ({ promoInfo }) => {
  console.log(promoInfo);
  return (
    <div>
      <div>
        <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
          <TbSquareRoundedCheckFilled />{" "}
          <span className="font-semibold">Media: </span>{" "}
        </p>
        <div className="flex gap-5 flex-wrap justify-center">
          {promoInfo?.mediaGallery?.map((media, idx) => (
            <img
              key={idx}
              src={media?.imgUrl}
              className="max-w-[250px] w-full h-[150px] object-cover"
            />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="mb-2 hover:text-[#1E6CB3] cursor-pointer text-gray-600 capitalize flex items-center gap-2">
          <TbSquareRoundedCheckFilled />{" "}
          <span className="font-semibold">Video: </span>{" "}
        </p>
        <div className="flex gap-5 flex-wrap">
          {promoInfo?.videoGallery?.map((video, idx) => (
            <video
              key={idx}
              controls
              width="100%"
              className="max-w-[300px] w-full h-auto"
            >
              <source src={video?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoInfo;
