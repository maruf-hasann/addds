import React from "react";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const PromoInfo = ({ promoInfo, number}) => {
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
              <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                <h4 className="font-medium text-sm mb-1">Media</h4>
                <div className="flex items-center gap-2 flex-wrap">
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
              </div>
              <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
                <h4 className="font-medium text-sm mb-1">Video</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex gap-5 flex-wrap justify-center">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoInfo;
